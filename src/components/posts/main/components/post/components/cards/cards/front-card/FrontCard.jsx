import { useContext, useEffect, useState, useRef } from 'react';
import sharedStyle from '@c-shared-style/Shared.module.css';
import postImageStyle from '@c-shared-style/PostImage.module.css';
import Title from '@c-c/headings/title/Title';
import Image from '@image';
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
import { debug } from '@debug';
import useLoadImage from '@use-load-image';

const FrontCard = (props) => {
    const showDebugging = true;
    const { post, standalone, editMode, defaultImageIndex } = props;
    const { renderPost } = useContext(PostContext);
    const { editedPost, setEditedPost } = useContext(EditedPostContext);
    const [previewImage, setPreviewImage] = useState(editedPost.data.imageUrl);
    const firstRenderRef = useRef(true);
    const { loadImage } = useLoadImage(true);

    /**
     * Clears the preview image when interacting with the `defaultImageIndex`
     * (`PickerPanel`) while retaining the initial image.
     */
    useEffect(() => {
        if (!firstRenderRef.current) {
            setPreviewImage(null);
            setEditedPost((prev) => ({
                ...prev,
                draft: { ...prev.draft, image: null },
                data: { ...prev.data, imageUrl: null },
            }));
        }

        const timeId = setTimeout(() => {
            firstRenderRef.current = false;
        }, 1000);

        return () => {
            clearTimeout(timeId);
        };

        // Ignoring dependency warning because the editedPost
        // state is only necessary the first render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultImageIndex]);

    const updateImage = (e) => {
        const loadedImage = loadImage(e);
        if (loadedImage) {
            setPreviewImage(loadedImage.url);

            try {
                setEditedPost((prev) => ({
                    ...prev,
                    draft: { ...prev.draft, image: loadedImage.file },
                    data: { ...prev.data, imageUrl: loadedImage.url },
                }));
            } catch (error) {
                debug(
                    'e',
                    showDebugging,
                    "Couldn't update edityed post data.",
                    error,
                );
            }
            debug(
                'd',
                showDebugging,
                'Edited post draft updated (image)' +
                    ' and saved the edited post image url' +
                    'used for resetting the image after a component unmount.',
                '',
            );
        }
    };

    const imageProps = {
        editMode,
        defaultImage: defaultImages[defaultImageIndex],
        image: {
            src: editMode ? previewImage : post?.image,
        },
        inputProps: {
            id: `post-image-${post.id}`,
            // Reset the value onClick to trigger renders even when
            // chosing the same image after interacting with the
            // `defaultImageIndex` (`PickerPanel`).
            onClick: (e) => {
                e.target.value = '';
            },
            onChange: updateImage,
        },
        previewImg: editMode ? previewImage : null,
        customStyle: postImageStyle,
    };

    return (
        <div className={`flex-row-absolute ${sharedStyle.post}`}>
            <div
                className={
                    'flex-column-relative ' +
                    sharedStyle['card-button'] +
                    ' ' +
                    sharedStyle['card-padding']
                }
                onClick={() => {
                    if (!standalone && !editMode) {
                        renderPost(post.id);
                    }
                }}
            >
                <Title {...{ editMode, standalone, title: post.title }} />
                <Image {...imageProps} />
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
