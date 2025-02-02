import style from './FrontCard.module.css';
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
import AlertContext from '@alert-context';
import { env } from '../../../../../../../../../../env.js';

const ShareButton = ({ show }) => {
    const { addAlert } = useContext(AlertContext);

    const handleShare = () => {
        if (env.MODE === 'development') {
            addAlert(
                "Didn't copy URL to clipboard because " +
                    'this operation requires an HTTPS connection.',
                'Info',
            );
        } else {
            navigator.clipboard.writeText(window.location.pathname);
            addAlert('URL has been copied to clipboard!', 'Done');
        }
    };

    if (show) {
        return (
            <button
                className={'flex-row-absolute ' + style['copy-url-button']}
                onClick={handleShare}
            >
                <i className="fa-solid fa-share"></i>
                <p className="flex-column-absolute">Share</p>
            </button>
        );
    }
    return null;
};

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
                draft: {
                    ...prev.draft,
                    image: null,
                    default_image_index: defaultImageIndex,
                },
                data: {
                    ...prev.data,
                    imageUrl: null,
                    imageHasBeenSelected: false,
                },
            }));
        }

        const timeId = setTimeout(() => {
            firstRenderRef.current = false;
        }, 1000);

        debug(
            'd',
            showDebugging,
            'post.default_image_index',
            post.default_image_index,
        );

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
                    data: {
                        ...prev.data,
                        imageUrl: loadedImage.url,
                        imageHasBeenSelected: true,
                    },
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
            <ShareButton show={standalone && !editMode} />

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
                {...{
                    postId: post?.id,
                    likes: post?.likes,
                    comments: post?.comments?.length,
                    ratings: post.ratings,
                    editMode,
                }}
            />
        </div>
    );
};

export default FrontCard;
