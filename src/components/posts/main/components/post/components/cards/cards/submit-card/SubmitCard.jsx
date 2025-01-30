import { useContext, useState } from 'react';
import style from './SubmitCard.module.css';
import sharedStyles from '../../../../SharedStyles.module.css';
// Card components
import Title from '@c-c/headings/title/Title';
// Contexts
import AlertContext from '@alert-context';
import EditedPostContext from '@edited-post-context';
import PostContext from '@post-context';
import NotificationContext from '@notification-context';
import GeneralLoadingContext from '@general-loading-context';
// Custom hooks
import useAPI from '@use-api';

// Logging
import { debug } from '@debug';
import AppCloseButtonContext from '@app-close-button-context';

const SubmitButton = () => {
    const showDebugging = true;
    // Contexts
    const { editedPost } = useContext(EditedPostContext);
    const { updateSinglePost, creatingPost } = useContext(PostContext);
    const { addNotification } = useContext(NotificationContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    const { appCloseButton } = useContext(AppCloseButtonContext);
    // Custom hooks
    const { addAlert } = useContext(AlertContext);
    const { apiRequest } = useAPI(true);
    // States
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const validateForm = () => {
        return true;
    };

    const handleSubmit = async () => {
        const init = async () => {
            addLoadingPoint();
            try {
                // Disable button
                setButtonDisabled(true);
                // Formdata draft
                const formDataDraft = {
                    title: editedPost.draft.title,
                    description: editedPost.draft.description,
                    instructions: editedPost.draft.instructions,
                    default_image_index: editedPost.draft.default_image_index,
                    harmful_post: editedPost.draft.harmful_post,
                    tags: editedPost.draft.tags,
                    harmful_tool_categories: JSON.stringify(
                        editedPost.draft.harmful_tool_categories,
                    ),
                    harmful_material_categories: JSON.stringify(
                        editedPost.draft.harmful_material_categories,
                    ),
                    tools: JSON.stringify(editedPost.draft.tools),
                    materials: JSON.stringify(editedPost.draft.materials),
                    image: editedPost.draft.image,
                };

                const response = await apiRequest({
                    method: creatingPost ? 'POST' : 'PUT',
                    validateForm,
                    formDataDraft,
                    relativeURL: creatingPost
                        ? '/posts/posts/'
                        : `/posts/posts/${editedPost.draft.id}/`,
                    debugMessages: {
                        error: 'Error when creating a post',
                        successfulBackEndResponse: 'Created post successfully',
                    },
                    uxMessages: {
                        error: "Couldn't create post",
                    },
                    authorizationHeader: true,
                });

                if (response) {
                    // Ensure the post is visible immediately
                    await updateSinglePost(editedPost.draft.id);
                    // Close edit mode/post
                    appCloseButton();
                    debug(
                        's',
                        showDebugging,
                        'Post posted successfully:',
                        response,
                    );
                    addAlert(
                        'Your post should be public now! Thank you ' +
                            'for sharing!',
                        'Done',
                    );
                    await addNotification(true, 'Posted!');
                } else {
                    debug(
                        'e',
                        showDebugging,
                        "Couldn't create post (backend):",
                        response,
                    );
                    await addNotification(false, "Couldn't create post :(");
                }

                debug('d', showDebugging, '________', '________');
            } catch (error) {
                addAlert(
                    'Hmm, something went wrong. You can try to ' +
                        'refresh your browser but your edits will be erased.',
                    'Error',
                );
                debug(
                    'e',
                    showDebugging,
                    '(Frontend) Something went wrong when  ' +
                        'creating a post',
                    error,
                );
            } finally {
                removeLoadingPoint();
                setButtonDisabled(false);
            }
        };

        await init();
    };

    return (
        <div
            className={
                'flex-column-relative ' + style['submit-button-container']
            }
        >
            <button
                className={'flex-column-relative ' + style['submit-button']}
                style={{
                    cursor: buttonDisabled ? 'not-allowed' : 'pointer',
                }}
                onClick={handleSubmit}
                disabled={buttonDisabled}
            >
                Submit
            </button>
        </div>
    );
};

const SubmitCard = (props) => {
    const { post, standalone, editMode } = props;

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title {...{ editMode, standalone, title: post.title }} />
            <SubmitButton {...{ editMode }} />
        </div>
    );
};

export default SubmitCard;
