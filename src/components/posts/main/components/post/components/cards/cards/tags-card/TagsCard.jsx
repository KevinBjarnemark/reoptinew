import { useContext } from 'react';
import sharedStyle from '@c-shared-style/Shared.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';
import { debug } from '@debug';
import AlertContext from '@alert-context';
import EditedPostContext from '@edited-post-context';

const TagsCard = (props) => {
    const showDebugging = true;
    const { post, standalone, editMode } = props;
    const { editedPost, setEditedPost } = useContext(EditedPostContext);
    const { addAlert } = useContext(AlertContext);

    const handleChange = (e) => {
        try {
            setEditedPost((prev) => ({
                ...prev,
                draft: { ...prev.draft, tags: e.target.value },
            }));
        } catch (error) {
            addAlert(
                'Something went wrong when saving your tags ' +
                    'to draft, try refreshing your browser. Note that ' +
                    'your edits will be erased after a browser refresh.',
                'Error',
            );
            debug(
                'e',
                showDebugging,
                'Error when updating edited post draft (tags):',
                error,
            );
        }
    };

    const textareaProps = !editMode
        ? {
              disabled: true,
              value: post?.tags || '',
          }
        : {
              disabled: false,
              defaultValue: editedPost.draft.tags || '',
          };

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyle.post} ` +
                sharedStyle['card-padding']
            }
        >
            <Title {...{ editMode, standalone, title: post.title }} />
            <Subtitle subtitle="Tags" />
            <div
                className={
                    'flex-column-relative ' + sharedStyle['text-section']
                }
            >
                <textarea
                    className={
                        'flex-column-relative ' + sharedStyle['textarea']
                    }
                    {...textareaProps}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    );
};

export default TagsCard;
