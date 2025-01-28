import { useContext } from 'react';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';
import { debug } from '@debug';
import AlertContext from '@alert-context';
import EditedPostContext from '@edited-post-context';

const InstructionsCard = (props) => {
    const showDebugging = true;
    const { post, standalone, editMode } = props;
    const { editedPost, setEditedPost } = useContext(EditedPostContext);
    const { addAlert } = useContext(AlertContext);

    const handleChange = (e) => {
        try {
            setEditedPost((prev) => ({
                ...prev,
                draft: { ...prev.draft, instructions: e.target.value },
            }));
            debug(
                'd',
                showDebugging,
                'Edited post draft updated (instructions).',
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
                'e',
                showDebugging,
                'Error when updating edited post draft (instructions):',
                error,
            );
        }
    };

    const textareaProps = !editMode
        ? {
              disabled: true,
              value: editedPost.draft.instructions,
          }
        : {
              disabled: false,
              defaultValue: editedPost.draft.instructions,
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
