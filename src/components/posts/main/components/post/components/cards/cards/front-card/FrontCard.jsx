import { useContext } from 'react';
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

const FrontCard = (props) => {
    const { post, focused, editedPostRef, editMode, defaultImageIndex } =
        props;
    const { renderPost, previewImage, setPreviewImage } =
        useContext(PostContext);

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
                    if (!focused && !editMode) {
                        renderPost(post.id);
                    }
                }}
            >
                <Title title={post.title} focused={focused} />
                <Image
                    editMode={editMode}
                    focused={focused}
                    defaultImage={defaultImages[defaultImageIndex]}
                    image={{ src: post?.image }}
                    inputProps={{
                        id: `post-image-${post.id}`,
                        onChange: (e) => {
                            const file = e.target.files[0];
                            if (file) {
                                editedPostRef.current.image = file;
                                setPreviewImage(URL.createObjectURL(file));
                            }
                        },
                    }}
                    previewImg={editMode ? previewImage : null}
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
