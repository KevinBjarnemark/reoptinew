import { useMemo } from 'react';
import style from './Post.module.css';
import EngagementPanel from './components/engagement-panel/EngagementPanel';
import defaultImage1 from '../../../assets/images/post/default/1.webp';
import defaultImage2 from '../../../assets/images/post/default/2.webp';
import defaultImage3 from '../../../assets/images/post/default/3.webp';
import defaultImage4 from '../../../assets/images/post/default/4.webp';

const defaultImages = [
    defaultImage1,
    defaultImage2,
    defaultImage3,
    defaultImage4,
];

const Image = ({ image }) => {
    const randomImageIndex = useMemo(
        () => Math.floor(Math.random() * defaultImages.length),
        [],
    );

    return (
        <img
            className={`flex-column-relative ${style.image}`}
            src={image.src ? image.src : defaultImages[randomImageIndex]}
        ></img>
    );
};

const Post = ({ post, focusedPost, setFocusedPost, postsLength }) => {
    const focused = focusedPost ? focusedPost === post.id : false;

    const handleFocus = () => {
        setFocusedPost(post.id);
    };

    const handleClose = () => {
        setFocusedPost(null);
    };

    const focusedStyle = focused
        ? {
              width: '66vw',
              zIndex: postsLength + 1,
              position: 'fixed',
              top: 'var(--header-height)',
          }
        : {};

    return (
        <section
            className={`flex-row-relative ${style['post-under']}`}
            style={{ ...focusedStyle }}
        >
            <div className={`flex-row-absolute ${style.post}`}>
                <button
                    className={`flex-column-relative ${style['card-button']}`}
                    onClick={handleFocus}
                >
                    <h6>{post.title}</h6>

                    <Image image={{ src: post.image }} />
                </button>
                <EngagementPanel
                    savesMoney={0}
                    savesTime={0}
                    isUseful={0}
                    likes={post?.likes}
                    comments={post?.comments?.length}
                />

                {focused ? (
                    <button
                        className={`flex-row-absolute ${style['close-button']}`}
                        onClick={handleClose}
                    >
                        X
                    </button>
                ) : null}
            </div>
        </section>
    );
};

// Attach subcomponents
Post.EngagementPanel = EngagementPanel;

export default Post;
