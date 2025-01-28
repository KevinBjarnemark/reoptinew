import { useContext } from 'react';
import style from './AppCloseButton.module.css';
import AppCloseButtonContext from '@app-close-button-context';
import EditedPostContext from '@edited-post-context';
import PostContext from '@post-context';
import { debug } from '@debug';

const AppCloseButton = () => {
    const showDebugging = true;
    const { showAppCloseButton } = useContext(AppCloseButtonContext);
    const { clearEditedPost } = useContext(EditedPostContext);
    const { setEditingPost, setPreviewImage, editingPost, handleClosePost } =
        useContext(PostContext);

    const clearEditor = () => {
        if (editingPost) {
            clearEditedPost(); // Clear edits
            setEditingPost(''); // Clear editing post id
            setPreviewImage(null); // Clear preview image
            debug('d', showDebugging, 'Editor data was cleared.', '');
        }
    };

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
