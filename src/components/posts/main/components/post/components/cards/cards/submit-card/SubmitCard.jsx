import { useContext, useState, useEffect } from 'react';
import style from './SubmitCard.module.css';
import sharedStyle from '@c-shared-style/Shared.module.css';
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
import { POST_UNIQUE_ID_CREATE } from '@constants';

const SubmitButton = () => {
    const showDebugging = true;
    // Contexts
    const { editedPost } = useContext(EditedPostContext);
    const { updateSinglePost, addSinglePost, creatingPost } =
        useContext(PostContext);
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
                    // NOT SUPPORTED!
                    // Remove the image from the request when the user
                    // editing an already created post and chosing not to
                    // upload an image.
                    // This is not supported in the backend.
                    ...(!creatingPost &&
                    !editedPost.data.imageHasBeenSelected &&
                    editedPost.draft.image
                        ? {}
                        : { image: editedPost.draft.image }),
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
                    if (editedPost.draft.id === POST_UNIQUE_ID_CREATE) {
                        // Add the newly created post
                        addSinglePost(response);
                    } else {
                        // Fetch and replace the newly edited post
                        await updateSinglePost(editedPost.draft.id);
                    }

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
    const { creatingPost } = useContext(PostContext);
    const { editedPost } = useContext(EditedPostContext);
    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        if (
            !creatingPost &&
            !editedPost.data.imageHasBeenSelected &&
            editedPost.draft.image
        ) {
            addAlert(
                "Since you didn't upload an image, your already " +
                    'chosen image will be deleted. Our system cannot ' +
                    "handle this at the moment. If you've picked a " +
                    "default image and don't want a custom image, " +
                    "there's nothing to worry about.",
                'Warning',
            );
        }
        // `addAlert` is in itself not a dependency,
        // but since it's imported from context, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creatingPost, editedPost]);

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyle.post} ` +
                sharedStyle['card-padding']
            }
        >
            <Title {...{ editMode, standalone, title: post.title }} />
            <SubmitButton {...{ editMode }} />
        </div>
    );
};

export default SubmitCard;
