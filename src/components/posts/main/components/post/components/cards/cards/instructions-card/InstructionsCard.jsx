import { useContext, useEffect, useState } from 'react';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';
import PostContext from '@post-context';
import { debug } from '@debug';
import AlertContext from '@alert-context';

const InstructionsCard = (props) => {
    const showDebugging = true;
    const { post, standalone, editMode } = props;
    const { editedPostRef } = useContext(PostContext);
    const { addAlert } = useContext(AlertContext);
    const [instructionsDynamicKey, setInstructionsDynamicKey] =
        useState(false);
    const [editedPostInstructions, setEditedPostInstructions] = useState(
        post.instructions,
    );

    useEffect(() => {
        // Use saved edited post data to update the instructions after
        // allowing the component to mount.
        const timeId = setTimeout(() => {
            if (editedPostRef.current.draft.instructions) {
                setEditedPostInstructions(
                    editedPostRef.current.draft.instructions,
                );
                setInstructionsDynamicKey((prev) => !prev);
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
            editedPostRef.current.draft.instructions = e.target.value;
            setEditedPostInstructions(e.target.value);
            debug(
                showDebugging,
                'Edited post draft updated (instructions)',
                '',
            );
        } catch (error) {
            addAlert(
                'Something went wrong when saving your instructions ' +
                    'to draft, try refreshing your browser. Note that ' +
                    'your edits will be erased after a browser refresh.',
                'Error',
            );
            debug(
                showDebugging,
                'Error when updating edited post draft (instructions)',
                error,
            );
        }
    };

    const textareaProps = !editMode
        ? {
              disabled: true,
              value: editedPostInstructions,
          }
        : {
              disabled: false,
              defaultValue: editedPostInstructions,
          };

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title title={post.title} standalone={standalone} />
            <Subtitle subtitle="Instructions" />
            <div
                className={
                    'flex-column-relative ' + sharedStyles['text-section']
                }
            >
                <textarea
                    key={`textarea-${instructionsDynamicKey}`}
                    className={
                        'flex-column-relative ' + sharedStyles['textarea']
                    }
                    {...textareaProps}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    );
};

export default InstructionsCard;
