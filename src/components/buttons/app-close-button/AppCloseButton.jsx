import { useContext, useEffect } from 'react';
import style from './AppCloseButton.module.css';
import AppCloseButtonContext from '@app-close-button-context';
import EditedPostContext from '@edited-post-context';
import PostContext from '@post-context';
import { debug } from '@debug';

/**
 * A big triangle close button in the upper-right corner.
 *
 * This component is integrated with multiple contexts, ensuring
 * efficient rendering.
 *
 * Reasoning:
 * Since the editedPost may change it's state often it's more
 * efficient to perform some actions through this component.
 *
 * If the editedPost state was located in the PostContext, it would
 * trigger a cascade of renders through each post whenever the editedpost
 * state changes. It's more efficient to separate these contexts and manage
 * the states in this very small component.
 *
 * @returns {JSX.Element}
 */
const AppCloseButton = () => {
    const showDebugging = true;
    const { showAppCloseButton, closeAppButtonTrigger } = useContext(
        AppCloseButtonContext,
    );
    const { clearEditedPost } = useContext(EditedPostContext);
    const { setEditingPost, setPreviewImage, editingPost, handleClosePost } =
        useContext(PostContext);

    /**
     * This useEffect is listening to a useState existing in the
     * `EditedPostContext`. When the useState is not `null` and changes,
     * it executes an app close button click.
     */
    useEffect(() => {
        if (closeAppButtonTrigger !== null) {
            handleClick();
        }

        // `handleClick` is in itself not a dependency,
        // but since it's imported from context, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closeAppButtonTrigger]);

    /**
     * Clears the editor if `editingPost` is loaded with an id.
     *
     * This function clears states both in `PostContext` and
     * `EditedPostContext`. This ensures clean states and prevents
     * flickering glitches when opening posts.
     *
     * @returns {void}
     * @throws Errors must be handled by the caller
     */
    const clearEditor = () => {
        if (editingPost) {
            clearEditedPost(); // Clear edits
            setEditingPost(''); // Clear editing post id
            setPreviewImage(null); // Clear preview image
            debug('d', showDebugging, 'Editor data was cleared.', '');
        }
    };

    /**
     * Clears the editor and closes the currently opened post.
     *
     */
    const handleClick = () => {
        clearEditor();
        handleClosePost();
    };

    if (showAppCloseButton) {
        return (
            <button
                className={`flex-column-fixed ${style['button']}`}
                onClick={handleClick}
            >
                <p className="flex-column-fixed">X</p>
            </button>
        );
    }
};

export default AppCloseButton;
