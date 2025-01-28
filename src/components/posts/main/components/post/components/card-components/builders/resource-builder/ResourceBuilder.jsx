import { useRef, useContext, useEffect, useState } from 'react';
import style from './ResourceBuilder.module.css';
import { debug } from '@debug';
import AlertContext from '@alert-context';
import { isArray } from '@helpers';
import EditedPostContext from '@edited-post-context';

const AddResource = (props) => {
    const showDebugging = true;
    const { draftEntry, resource, setLoacalResources } = props;
    const { editedPost, setEditedPost } = useContext(EditedPostContext);
    const { addAlert } = useContext(AlertContext);
    const resourceDraft = useRef({});

    const validate = () => {
        // Ensure the resource name doesn't already exist
        const itemsNameAlreadyExists = editedPost.draft[draftEntry].some(
            (item) => item.name === resourceDraft.current.name,
        );
        if (itemsNameAlreadyExists) {
            addAlert(
                `A ${resource.toLowerCase()} with the same name already ` +
                    'exists. They must be unique.',
                'Error',
            );
            return false;
        }
        return true;
    };

    const handleAddResource = () => {
        if (!validate()) {
            // This is not logged as an error as it is directed towards
            // the user
            debug('d', showDebugging, 'Validation failed.', '');
            return;
        }

        // Save the resource and update state
        setEditedPost((prev) => ({
            // Spread previous values
            ...prev,
            // Target the draft
            draft: {
                // Spread previous draft values
                ...prev.draft,
                [draftEntry]: [
                    // Spread previous draft values at correct entry
                    ...prev.draft[draftEntry],
                    // Add the current resource
                    {
                        ...resourceDraft.current,
                    },
                ],
            },
        }));

        // Add resource locally
        setLoacalResources((prev) => [...prev, { ...resourceDraft.current }]);

        debug(
            'd',
            showDebugging,
            'Added this resource to editedPost:',
            resourceDraft.current,
        );
    };

    const handleChange = (e) => {
        // Save to local draft
        resourceDraft.current[e.target.name] = e.target.value;
    };

    return (
        <section
            className={
                'flex-column-relative ' + style['add-resource-container']
            }
        >
            <div
                className={
                    'flex-column-relative ' +
                    style['add-resource-inner-container']
                }
            >
                <h6>{`Add ${resource}`}</h6>
                <label htmlFor="quantity" className="flex-column-relative">
                    Quantity
                </label>

                <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    onChange={handleChange}
                ></input>
                <label htmlFor="resource" className="flex-column-relative">
                    {resource}
                </label>
                <input
                    id="resource"
                    name="name"
                    type="text"
                    onChange={handleChange}
                ></input>

                <label htmlFor="description" className="flex-column-relative">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleChange}
                ></textarea>

                <button
                    className="flex-column-relative"
                    onClick={handleAddResource}
                >
                    {`Add ${resource}`}
                </button>
            </div>
        </section>
    );
};

const RemoveButton = (props) => {
    const { resourceName, draftEntry, setLoacalResources } = props;
    const { setEditedPost } = useContext(EditedPostContext);

    const handleRemove = () => {
        // Filter out item with identical name
        setEditedPost((prev) => ({
            // Spread previous values
            ...prev,
            // Target the draft
            draft: {
                // Spread the previous draft values
                ...prev.draft,
                // Target the correct entry
                [draftEntry]:
                    // Filter out resource with the same as `resourceName`
                    prev.draft[draftEntry].filter(
                        (i) => i.name !== resourceName,
                    ),
            },
        }));

        setLoacalResources((prev) => [
            ...prev.filter((i) => i.name !== resourceName),
        ]);
    };

    return (
        <button
            className={'flex-column-absolute ' + style['remove-button']}
            onClick={handleRemove}
        >
            X
        </button>
    );
};

const Resource = (props) => {
    const { resource, draftEntry, editMode, setLoacalResources } = props;

    if (resource) {
        return (
            <li className="flex-column-relative w-100">
                <div className={'flex-column-relative ' + style.resource}>
                    <h6>
                        <em>{resource?.quantity}</em>
                        {resource?.name}
                    </h6>

                    <p>{resource?.description}</p>
                    {editMode ? (
                        <RemoveButton
                            {...{
                                resourceName: resource?.name,
                                draftEntry,
                                setLoacalResources,
                            }}
                        />
                    ) : null}
                </div>
            </li>
        );
    }
};

const Resources = (props) => {
    const { draftEntry, editMode, loacalResources, setLoacalResources } =
        props;

    return (
        <ul className={'flex-column-relative ' + style.container}>
            {loacalResources.map((resource, index) => (
                <Resource
                    key={`${resource.id ? resource.id : index}-${
                        resource.name
                    }-${index}`}
                    {...{
                        resource,
                        draftEntry,
                        editMode,
                        setLoacalResources,
                    }}
                />
            ))}
        </ul>
    );
};

const ResourceBuilder = (props) => {
    const showDebugging = true;
    const { editMode, resource, resources } = props;
    const { editedPost } = useContext(EditedPostContext);
    const { addAlert } = useContext(AlertContext);
    const [loacalResources, setLoacalResources] = useState([]);
    const draftEntry = resource === 'Material' ? 'materials' : 'tools';

    useEffect(() => {
        if (resource !== 'Material' && resource !== 'Tool') {
            addAlert(
                "Something in our system didn't go right, try " +
                    'refreshing your browser.',
                'Error',
            );
            debug(
                'e',
                showDebugging,
                "UNEXPECTED! A defined property couldn't " + 'be recognized. ',
                resource,
            );
        } else {
            if (editMode) {
                debug(
                    'd',
                    showDebugging,
                    'Setting local resources based on `editedPost` ' +
                        'because the user is in `editMode`.',
                    '',
                );
                setLoacalResources(editedPost.draft[draftEntry]);
            } else {
                debug(
                    'd',
                    showDebugging,
                    'Setting local resources to data fetched from DB ' +
                        'because the user is not in `editMode`.',
                    '',
                );
                setLoacalResources(resources);
            }
        }

        // `addAlert` is in itself not a dependency,
        // but since it's imported as a custom hook, ES Lint is flagging
        // it as one unnecessarily. `resource` and `showDebugging` are
        // both also flagged unnecessarily as they won't change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode]);

    if (isArray(loacalResources, true)) {
        return (
            <>
                {editMode ? (
                    <AddResource
                        {...{
                            resource,
                            draftEntry,
                            setLoacalResources,
                        }}
                    />
                ) : null}
                <Resources
                    {...{
                        draftEntry,
                        editMode,
                        loacalResources,
                        setLoacalResources,
                    }}
                />
            </>
        );
    }
};

export default ResourceBuilder;
