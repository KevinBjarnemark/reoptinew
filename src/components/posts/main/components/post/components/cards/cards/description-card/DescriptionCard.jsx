import { useContext, useEffect, useState } from 'react';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';
import PostContext from '@post-context';
import { debug } from '@debug';
import AlertContext from '@alert-context';

const DescriptionCard = (props) => {
    const showDebugging = true;
    const { post, standalone, editMode } = props;
    const { editedPostRef } = useContext(PostContext);
    const { addAlert } = useContext(AlertContext);
    const [textareaDynamicKey, setTextareaDynamicKey] = useState(false);

    const [editedPostDescription, setEditedPostDescription] = useState(
        post.description,
    );

    useEffect(() => {
        // Use saved edited post data to update the description after
        // allowing the component to mount.
        const timeId = setTimeout(() => {
            if (editedPostRef.current.draft.description) {
                setEditedPostDescription(
                    editedPostRef.current.draft.description,
                );
                setTextareaDynamicKey((prev) => !prev);
            }
        }, 0);
        return () => {
            clearTimeout(timeId);
        };

        // Ignoring editedPostRef as a dependency because React doesn't
        // track changes to refs, and adding it here would have no effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        try {
            editedPostRef.current.draft.description = e.target.value;
            setEditedPostDescription(e.target.value);
            debug(
                showDebugging,
                'Edited post draft updated (description)',
                '',
            );
        } catch (error) {
            addAlert(
                'Something went wrong when saving your description ' +
                    'to draft, try refreshing your browser. Note ' +
                    'that your edits will be erased after a browser refresh.',
                'Error',
            );
            debug(
                showDebugging,
                'Error when updating edited post draft (description)',
                error,
            );
        }
    };

    const textAreaProps = !editMode
        ? {
              disabled: true,
              value: editedPostDescription,
          }
        : {
              disabled: false,
              defaultValue: editedPostDescription,
          };

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title title={post.title} standalone={standalone} />
            <Subtitle subtitle="Description" />
            <div
                className={
                    'flex-column-relative ' + sharedStyles['text-section']
                }
            >
                <textarea
                    key={`textarea-${textareaDynamicKey}`}
                    className={
                        'flex-column-relative ' + sharedStyles['textarea']
                    }
                    onChange={handleChange}
                    {...textAreaProps}
                ></textarea>
            </div>
        </div>
    );
};

export default DescriptionCard;
