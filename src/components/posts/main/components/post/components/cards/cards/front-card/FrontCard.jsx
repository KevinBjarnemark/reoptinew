import { useContext, useEffect, useState } from 'react';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '@c-c/headings/title/Title';
import Image from '@c-c/image/Image';
import EngagementPanel from '@c-c/engagement-panel/EngagementPanel';
import PostContext from '@post-context';
import defaultImage1 from '@images/post/default/1.webp';
import defaultImage2 from '@images/post/default/2.webp';
import defaultImage3 from '@images/post/default/3.webp';
import defaultImage4 from '@images/post/default/4.webp';
const defaultImages = [
    defaultImage1,
    defaultImage2,
    defaultImage3,
    defaultImage4,
];
import { createFileURL } from '@helpers';
import { debug } from '@debug';
import GeneralLoadingContext from '@general-loading-context';
import AlertContext from '@alert-context';

const FrontCard = (props) => {
    const showDebugging = true;
    const { post, standalone, editedPostRef, editMode, defaultImageIndex } =
        props;
    const { renderPost, previewImage, setPreviewImage, editingPost } =
        useContext(PostContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    const editingThisPost = editingPost === post?.id;
    const [firstRender, setFirstRender] = useState(true);
    const [imageDynamicKey, setImageDynamicKey] = useState(false);
    const { addAlert } = useContext(AlertContext);

    const updateImage = (e) => {
        addLoadingPoint();
        try {
            const file = e.target.files[0];
            if (editingThisPost && file) {
                const fileUrl = createFileURL(file);
                setPreviewImage(fileUrl);
                debug(showDebugging, 'Post preview image updated', '');
                editedPostRef.current.draft.image = file;
                debug(showDebugging, 'Edited post draft updated (image)', '');
                editedPostRef.current.data.imageUrl = fileUrl;
                debug(
                    showDebugging,
                    'Saved the edited post image url, ' +
                        'used for resetting the image after a component ' +
                        'unmount',
                    '',
                );
                setImageDynamicKey((prev) => !prev);
            }
        } catch (error) {
            addAlert(
                'Something went adding your custom image, try refreshing ' +
                    'your browser. Note that your edits will be erased ' +
                    'after a browser refresh.',
                'Error',
            );
            debug(
                showDebugging,
                'Error when attempting to add a custom post image',
                error,
            );
        } finally {
            removeLoadingPoint();
        }
    };

    /** Manages the firstRender state and ensures the preview
     * image is retained when revisiting this card.
     */
    useEffect(() => {
        let timeId;
        // This is the first render
        setFirstRender(false);

        // Use saved edited post data to update the preview image after
        // allowing the  dynamic key change to take effect.
        if (editedPostRef.current.data.imageUrl) {
            timeId = setTimeout(() => {
                setPreviewImage(editedPostRef.current.data.imageUrl);
            }, 0);
        }

        return () => {
            clearTimeout(timeId);
        };
    }, []);

    useEffect(() => {
        if (!firstRender && editingThisPost) {
            setPreviewImage(null);
            // Clear the custom image
            editedPostRef.current.draft.image = null;
            // Save default_image_index
            editedPostRef.current.draft.default_image_index =
                defaultImageIndex;
        }
    }, [firstRender, defaultImageIndex]);

    return (
        <div className={`flex-row-absolute ${sharedStyles.post}`}>
            <div
                className={
                    'flex-column-relative ' +
                    sharedStyles['card-button'] +
                    ' ' +
                    sharedStyles['card-padding']
                }
                onClick={() => {
                    if (!standalone && !editMode) {
                        renderPost(post.id);
                    }
                }}
            >
                <Title title={post.title} standalone={standalone} />
                <Image
                    // This dynamic key fixes the following issue:
                    // 1. Uploading an image.
                    // 2. Selecting a default image from the picker panel.
                    // 3. Re-uploading the same image as before.
                    //
                    // A state change will not trigger a re-render in this case.
                    key={`image-${imageDynamicKey}`}
                    editMode={editMode}
                    standalone={standalone}
                    defaultImage={defaultImages[defaultImageIndex]}
                    image={{
                        src: editingThisPost ? previewImage : post?.image,
                    }}
                    inputProps={{
                        id: `post-image-${post.id}`,
                        onChange: (e) => {
                            updateImage(e);
                        },
                    }}
                    previewImg={editingThisPost ? previewImage : null}
                />
            </div>

            <EngagementPanel
                savesMoney={0}
                savesTime={0}
                isUseful={0}
                postId={post?.id}
                likes={post?.likes}
                comments={post?.comments?.length}
            />
        </div>
    );
};

export default FrontCard;
