import { useMemo, useContext, useState } from 'react';
import style from './Post.module.css';
import EngagementPanel from './components/engagement-panel/EngagementPanel';
import defaultImage1 from '../../../assets/images/post/default/1.webp';
import defaultImage2 from '../../../assets/images/post/default/2.webp';
import defaultImage3 from '../../../assets/images/post/default/3.webp';
import defaultImage4 from '../../../assets/images/post/default/4.webp';
import PostContext from '../../../context/post/PostContext';
import UserContext from '../../../context/UserContext';
import defaultAvatarImage from '../../../assets/images/user/default-avatar.webp';
const defaultImages = [
    defaultImage1,
    defaultImage2,
    defaultImage3,
    defaultImage4,
];
import { env } from '../../../../env';
import { Link } from 'react-router-dom';

const LeftAndRightButtons = ({ show, setCardIndex }) => {
    const cardsAmount = 5;

    if (show) {
        return (
            <>
                <button
                    className={`flex-column-fixed ${style['next-button']}`}
                    onClick={() => {
                        setCardIndex((prev) =>
                            Math.min(prev + 1, cardsAmount - 1),
                        );
                    }}
                ></button>
                <button
                    className={`flex-column-fixed ${style['previous-button']}`}
                    onClick={() => {
                        setCardIndex((prev) => Math.max(prev - 1, 0));
                    }}
                ></button>
            </>
        );
    }
};

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

const FirstCard = ({ post, handleFocus, focused }) => {
    const titleStyle = focused ? { fontSize: '150%' } : {};

    return (
        <div className={`flex-row-absolute ${style.post}`}>
            <button
                className={
                    'flex-column-relative ' +
                    style['card-button'] +
                    ' ' +
                    style['card-padding']
                }
                onClick={() => {
                    handleFocus(post.id);
                }}
            >
                <h6 style={{ ...titleStyle }}>{post.title}</h6>

                <Image image={{ src: post.image }} />
            </button>
            <EngagementPanel
                savesMoney={0}
                savesTime={0}
                isUseful={0}
                likes={post?.likes}
                comments={post?.comments?.length}
            />
        </div>
    );
};

const SecondCard = ({ post, handleFocus }) => {
    return (
        <div
            className={
                `flex-column-absolute ${style.post} ` + style['card-padding']
            }
        >
            <h6 style={{ fontSize: '150%' }}>Description</h6>
            <div className={`flex-column-relative ${style['text-section']}`}>
                {post.description}
            </div>
        </div>
    );
};

const CardChoser = ({ cardIndex, post, handleFocus, focused }) => {
    switch (cardIndex) {
        default: {
            return (
                <FirstCard
                    post={post}
                    handleFocus={handleFocus}
                    focused={focused}
                />
            );
        }
        case 0: {
            return (
                <FirstCard
                    post={post}
                    handleFocus={handleFocus}
                    focused={focused}
                />
            );
        }
        case 1: {
            return (
                <SecondCard
                    post={post}
                    handleFocus={handleFocus}
                    focused={focused}
                />
            );
        }
        case 2: {
            return <div>Third card</div>;
        }
        case 3: {
            return <div>Fourth card</div>;
        }
        case 4: {
            return <div>Fifth card</div>;
        }
    }
};

const EllipsisMenuButton = ({ show }) => {
    if (show) {
        return (
            <>
                <div className={`flex-column-absolute ${style['dot']}`}></div>
                <div
                    className={`flex-column-absolute ${style['dot']}`}
                    style={{ right: '13px' }}
                ></div>
                <div
                    className={`flex-column-absolute ${style['dot']}`}
                    style={{ right: '26px' }}
                ></div>
            </>
        );
    }
};

const ProfileImage = ({ src }) => {
    return (
        <div
            className={
                'flex-column-relative' + ' ' + style['profile-image-container']
            }
        >
            <img
                className={`flex-column-relative ${style['profile-image']}`}
                // Fallback to default image
                src={src ? `${env.VITE_API_URL}/${src}` : defaultAvatarImage}
                alt="Profile image"
            />
        </div>
    );
};

const UserBadge = ({ image, username }) => {
    return (
        <Link
            className={`flex-row-absolute ${style['user-badge']}`}
            onClick={() => {
                window.scrollTo(0, 0);
            }}
            to={`/profile/${username}`}
        >
            <ProfileImage src={image} />
            <p className={`flex-column-absolute`}>{username}</p>
        </Link>
    );
};

const Post = ({ standalone, post, postsLength }) => {
    const { profile } = useContext(UserContext);
    const { handleFocus } = useContext(PostContext);
    const focused = standalone;
    const isAuthor = profile?.user_id === post?.author?.id;
    const [cardIndex, setCardIndex] = useState(0);

    // Enlarge this component when focused
    const focusedStyle = focused
        ? {
              zIndex: postsLength + 1,
              position: 'fixed',
              width: '60%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
          }
        : {};

    return (
        <section
            className={`flex-row-relative ${style['post-under']}`}
            style={{ ...focusedStyle }}
        >
            <CardChoser
                cardIndex={cardIndex}
                post={post}
                focused={focused}
                handleFocus={handleFocus}
            />
            <LeftAndRightButtons show={focused} setCardIndex={setCardIndex} />
            <EllipsisMenuButton
                // Show if the user is the author (in focused view)
                show={!focused && isAuthor}
            />
            <UserBadge
                image={post?.author?.image}
                username={post?.author?.username}
            />
        </section>
    );
};

export default Post;
