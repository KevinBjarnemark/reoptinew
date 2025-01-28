import { useContext, useEffect } from 'react';
import style from './CheckboxBuilder.module.css';
import { debug } from '@debug';
import AlertContext from '@alert-context';
import { isArray } from '@helpers';
import EditedPostContext from '@edited-post-context';

const MappedItems = (props) => {
    const showDebugging = true;
    const { choicesArray, entry } = props;
    const { editedPost, setEditedPost } = useContext(EditedPostContext);

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setEditedPost((prev) => ({
                // Spread previous values
                ...prev,
                // Target the draft
                draft: {
                    // Spread previous draft values
                    ...prev.draft,
                    [entry]: [
                        // Spread previous draft values at correct entry
                        ...prev.draft[entry],
                        // Add the item
                        e.target.name,
                    ],
                },
            }));

            debug(
                'd',
                showDebugging,
                `Added ${e.target.name} from local items`,
                '',
            );
        } else {
            setEditedPost((prev) => ({
                // Spread previous values
                ...prev,
                // Target the draft
                draft: {
                    // Spread previous draft values
                    ...prev.draft,
                    // Target the correct entry
                    [entry]:
                        // Filter out item equal to `e.target.name`
                        prev.draft[entry].filter((i) => i !== e.target.name),
                },
            }));

            debug(
                'd',
                showDebugging,
                `Removed ${e.target.name} from local items`,
                '',
            );
        }
    };

    return (
        <div>
            {choicesArray.map((item) => (
                <div
                    key={item.category}
                    className={`flex-row-relative ${style['item']}`}
                >
                    <label
                        className={`flex-column-relative ${style['label']}`}
                        htmlFor={item.category}
                    >
                        {item.category}
                    </label>
                    <div
                        className={
                            'flex-column-absolute ' +
                            style['checkbox-container']
                        }
                    >
                        <input
                            className={
                                'flex-column-relative ' + style['checkbox']
                            }
                            id={item.category}
                            name={item.category}
                            type="checkbox"
                            defaultChecked={
                                editedPost.draft[entry].includes(item.category)
                                    ? 'checked'
                                    : ''
                            }
                            onChange={handleCheckbox}
                        ></input>
                    </div>
                </div>
            ))}
        </div>
    );
};

/**
 * Note that this component is only mounted in
 * editMode, therefore no editMode checks needed.
 */
const CheckboxBuilder = (props) => {
    const showDebugging = true;
    const { title, description, entry, choicesArray } = props;
    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        if (
            entry !== 'harmful_tool_categories' &&
            entry !== 'harmful_material_categories'
        ) {
            addAlert(
                "Something in our system didn't go right, try " +
                    'refreshing your browser.',
                'Error',
            );
            debug(
                'e',
                showDebugging,
                "UNEXPECTED! A defined property couldn't " + 'be recognized. ',
                entry,
            );
        }

        // `addAlert` is in itself not a dependency,
        // but since it's imported as a custom hook, ES Lint is flagging
        // it as one unnecessarily. `Entry` is not a dependency either because
        // it won't change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isArray(choicesArray, true)) {
        return (
            <div className={`flex-column-relative ${style['container']}`}>
                <h6>{title}</h6>
                <p>{description}</p>
                <MappedItems {...{ choicesArray, entry }} />
            </div>
        );
    }
};

export default CheckboxBuilder;
