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

const Post = ({ post }) => {
    return (
        <section
            className={`flex-row-relative ${style['post-under']}`}
            key={post.id}
        >
            <button
                className={`flex-row-absolute ${style.post}`}
                key={post.id}
            >
                <div className={`flex-column-relative`} key={post.id}>
                    <h6>{post.title}</h6>
                    <Image image={{ src: post.image }} />
                </div>
                <EngagementPanel
                    engagementPanel={post.engagementPanel}
                    likes={post.likes}
                    comments={post?.comments?.length}
                />
            </button>
        </section>
    );
};

// Attach subcomponents
Post.EngagementPanel = EngagementPanel;

export default Post;
