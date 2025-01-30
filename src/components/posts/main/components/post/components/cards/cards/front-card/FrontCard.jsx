import { useContext, useEffect, useState, useRef } from 'react';
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
    const { renderPost } = useContext(PostContext);
    const { editedPost, setEditedPost } = useContext(EditedPostContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    const { addAlert } = useContext(AlertContext);
    const [previewImage, setPreviewImage] = useState(editedPost.data.imageUrl);
    const firstRenderRef = useRef(true);

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
                    data: { ...prev.data, imageUrl: fileUrl },
                }));
                debug(
                    'd',
                    showDebugging,
                    'Edited post draft updated (image)' +
                        ' and saved the edited post image url' +
                        'used for resetting the image after a component unmount.',
                    '',
                );
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

    const imageProps = {
        editMode,
        standalone,
        defaultImage: defaultImages[defaultImageIndex],
        image: {
            src: editMode ? previewImage : post?.image,
        },
        inputProps: {
            // Reset the value onClick to trigger renders even when
            // chosing the same image after interacting with the
            // `defaultImageIndex` (`PickerPanel`).
            onClick: (e) => {
                e.target.value = '';
            },
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
