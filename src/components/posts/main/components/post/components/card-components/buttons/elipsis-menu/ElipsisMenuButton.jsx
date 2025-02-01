import { useContext } from 'react';
import style from './EllipsisMenuButton.module.css';
// Contexts
import PostContext from '@post-context';
import EditedPostContext from '@edited-post-context';
import AlertContext from '@alert-context';
import GeneralLoadingContext from '@general-loading-context';
import NotificationContext from '@notification-context';
// Components
import BasicMenu from '../../../../../../../../menus/basic-menu/BasicMenu';
import BorderSeparator from '@border-separator';
// Custom hooks
import useAPI from '@use-api';
// Functions
import { debug } from '@debug';
import PopUpContext from '@pop-up-context';
import PopUp from '../../../../../../../../pop-ups/pop-up/PopUp';

const DeleteContent = ({ postId }) => {
    const showDebugging = true;
    const { removeSinglePost } = useContext(PostContext);
    const { addAlert } = useContext(AlertContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    const { apiRequest } = useAPI(true);
    const { addNotification } = useContext(NotificationContext);
    const { closePopUp } = useContext(PopUpContext);

    const handleDelete = async () => {
        const init = async () => {
            addLoadingPoint();
            try {
                const response = await apiRequest({
                    authorizationHeader: true,
                    method: 'DELETE',
                    relativeURL: `/posts/post/delete-post/${postId}/`,
                    debugMessages: {
                        error: "Couldn't delete post",
                        successfulBackEndResponse: 'Deleted post successfully',
                    },
                    uxMessages: {
                        error: "Couldn't delete post",
                    },
                });

                if (response) {
                    // Ensure the post gets removed immediately
                    removeSinglePost(postId);
                    debug(
                        's',
                        showDebugging,
                        'Post deleted successfully:',
                        response,
                    );
                    addAlert('Your post should be deleted now', 'Done');
                    closePopUp();
                    await addNotification(true, 'Post deleted!');
                } else {
                    debug(
                        'e',
                        showDebugging,
                        "Couldn't delete post (backend):",
                        response,
                    );
                    await addNotification(false, "Couldn't delete post :(");
                }
            } catch (error) {
                addAlert(
                    'Hmm, something went wrong when deleting post. ' +
                        'Try refreshing your browser',
                    'Error',
                );
                debug(
                    'e',
                    showDebugging,
                    '(Frontend) Something went wrong when  ' +
                        'delteting a post',
                    error,
                );
            } finally {
                removeLoadingPoint();
            }
        };

        await init();
    };

    return (
        <PopUp.YesOrNo
            {...{
                title: 'Are you sure you want to delete?',
                yes: {
                    name: 'Delete',
                    color: 'rgb(255, 114, 114)',

                    onClick: handleDelete,
                },
                no: {
                    name: 'Close',
                    color: 'rgb(129, 154, 160)',

                    onClick: closePopUp,
                },
            }}
        />
    );
};

/**
 * A small menu displayed when interacting with the classic
 * tree-dots menu.
 *
 * @returns {JSX.Element} A typical react component
 */
const Menu = (props) => {
    const { toggled, handleToggle, post } = props;
    const { openEditor, posts } = useContext(PostContext);
    const { setEditedPost } = useContext(EditedPostContext);
    const { addAlert } = useContext(AlertContext);
    const { openPopUp } = useContext(PopUpContext);

    const handleEdit = async () => {
        // Close the menu
        handleToggle();
        // Pre-fill values
        const targetedPost = posts.find((i) => i.id === post.id);
        setEditedPost({
            data: {
                imageUrl: targetedPost.image,
                imageHasBeenSelected: false,
            },
            draft: { ...targetedPost },
        });
        // Set editing post id
        openEditor(post.id);
        // Avoid showing the info message immediately
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
        // Guide the user
        addAlert('Go to the last card to submit you edits.', 'Info');
    };

    const handleDeleteButton = () => {
        handleToggle();
        openPopUp('Delete post', <DeleteContent postId={post?.id} />);
    };

    return (
        <BasicMenu.Wrapper
            props={{
                toggled: toggled,
                handleToggle,
                name: `Settings ${post.id}`,
                top: '5px',
                hideTitle: true,
                hideShadow: true,
            }}
        >
            <BasicMenu.ButtonItem
                name="Delete"
                icon="fa-solid fa-trash"
                props={{ onClick: handleDeleteButton }}
            />
            <BorderSeparator />
            <BasicMenu.ButtonItem
                name="Edit"
                icon="fa-regular fa-pen-to-square"
                props={{
                    onClick: handleEdit,
                }}
            />
        </BasicMenu.Wrapper>
    );
};

const Button = (props) => {
    return (
        <button className={`flex-row-relative ${style['button']}`} {...props}>
            <div className={style['dot']}></div>
            <div className={style['dot']}></div>
            <div className={style['dot']}></div>
        </button>
    );
};

const EllipsisMenuButton = (props) => {
    const { post, show, settings } = props;

    const handleToggle = () => {
        settings.handleToggle(post.id);
    };
    if (show) {
        return (
            <div className={`flex-row-absolute ${style['container']}`}>
                <Button {...{ onClick: handleToggle }} />

                <div className={`flex-column-absolute ${style['menu']}`}>
                    <Menu
                        {...{
                            toggled: settings.toggled,
                            handleToggle,
                            post,
                        }}
                    />
                </div>
            </div>
        );
    }
};

export default EllipsisMenuButton;
