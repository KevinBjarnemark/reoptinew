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

/**
 * A small menu displayed when interacting with the classic
 * tree-dots menu.
 *
 * @returns {JSX.Element} A typical react component
 */
const Menu = (props) => {
    const showDebugging = true;
    const { toggled, handleToggle, post } = props;
    const { openEditor, posts, removeSinglePost } = useContext(PostContext);
    const { setEditedPost } = useContext(EditedPostContext);
    const { addAlert } = useContext(AlertContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    const { apiRequest } = useAPI(true);
    const { addNotification } = useContext(NotificationContext);

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

    const handleDelete = async () => {
        const init = async () => {
            addLoadingPoint();
            try {
                // Close the menu
                handleToggle();

                const response = await apiRequest({
                    authorizationHeader: true,
                    method: 'DELETE',
                    relativeURL: `/posts/post/delete-post/${post.id}/`,
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
                    removeSinglePost(post.id);
                    debug(
                        's',
                        showDebugging,
                        'Post deleted successfully:',
                        response,
                    );
                    addAlert('Your post should be deleted now', 'Done');
                    await addNotification(true, 'Deleted!');
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
                props={{ onClick: handleDelete }}
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
