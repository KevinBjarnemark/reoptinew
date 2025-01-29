import { useContext, useEffect, useState } from 'react';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '@c-c/headings/title/Title';
import Image from '@c-c/image/Image';
import EngagementPanel from '@c-c/engagement-panel/EngagementPanel';
import PostContext from '@post-context';
import EditedPostContext from '@edited-post-context';
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
    const { post, standalone, editMode, defaultImageIndex } = props;
    const { renderPost, previewImage, setPreviewImage } =
        useContext(PostContext);
    const { editedPost, setEditedPost } = useContext(EditedPostContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    const [firstRender, setFirstRender] = useState(true);
    const [imageDynamicKey, setImageDynamicKey] = useState(false);
    const { addAlert } = useContext(AlertContext);

    const updateImage = (e) => {
        addLoadingPoint();
        try {
            const file = e.target.files[0];
            if (editMode && file) {
                const fileUrl = createFileURL(file);
                setPreviewImage(fileUrl);
                debug('d', showDebugging, 'Post preview image updated.', '');
                setEditedPost((prev) => ({
                    ...prev,
                    draft: { ...prev.draft, image: file },
                }));
                debug(
                    'd',
                    showDebugging,
                    'Edited post draft updated (image).',
                    '',
                );
                setEditedPost((prev) => ({
                    ...prev,
                    data: { ...prev.data, imageUrl: fileUrl },
                }));
                debug(
                    'd',
                    showDebugging,
                    'Saved the edited post image url, ' +
                        'used for resetting the image after a component ' +
                        'unmount.',
                    '',
                );
                setImageDynamicKey((prev) => !prev);
            }
        } catch (error) {
            addAlert(
                'Something went wrong when adding your custom image, ' +
                    'try refreshing your browser. Note that your edits ' +
                    'will be erased after a browser refresh.',
                'Error',
            );
            debug(
                'e',
                showDebugging,
                'Error when attempting to add a custom post image.',
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
        // allowing the component to mount.
        if (editedPost.data.imageUrl || post.image) {
            timeId = setTimeout(() => {
                // Prioritize edited post data
                const imageUrl = editedPost.data.imageUrl || post.image;
                setPreviewImage(imageUrl);
            }, 100);
        }

        return () => {
            clearTimeout(timeId);
        };

        // This `useEffect` is intended to run only when the
        // component mounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * This useEffect clears the preview image when interacting
     * with the defaultImageIndex managed by the `PickerPanel`.
     */
    useEffect(() => {
        if (!firstRender && editMode) {
            setPreviewImage(null);
            // Clear the custom image and set `defaultImageIndex`
            setEditedPost((prev) => ({
                // Spread previous values
                ...prev,
                // Target the draft entry
                draft: {
                    // Spread previous draft
                    ...prev.draft,
                    // Clear the image
                    image: null,
                    // Set default image index
                    default_image_index: defaultImageIndex,
                },
                // Target the data entry
                data: {
                    // Spread previous data
                    ...prev.data,
                    // Clear the image url
                    imageUrl: null,
                },
            }));
        }

        // Both setEditedPost and setPreviewImage are in themselves not
        // dependencies, but since they're imported from context, ES Lint
        // is flagging them as such, unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstRender, defaultImageIndex, editMode]);

    const imageProps = {
        editMode,
        standalone,
        defaultImage: defaultImages[defaultImageIndex],
        image: {
            src: editMode ? previewImage : post?.image,
        },
        inputProps: {
            id: `post-image-${post.id}`,
            onChange: updateImage,
        },
        previewImg: editMode ? previewImage : null,
    };

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
                    // A state change will not trigger a re-render in this
                    // case.
                    key={`image-${imageDynamicKey}`}
                    {...imageProps}
                />
            </div>

            <EngagementPanel
                savesMoney={0}
                savesTime={0}
                isUseful={0}
                postId={post?.id}
                likes={post?.likes}
                comments={post?.comments?.length}
                editMode={editMode}
            />
        </div>
    );
};

export default FrontCard;
