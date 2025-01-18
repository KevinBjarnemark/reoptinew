import { useMemo, useContext, useState } from 'react';
import style from './Post.module.css';
import EngagementPanel from './components/engagement-panel/EngagementPanel';
import defaultImage1 from '../../../assets/images/post/default/1.webp';
import defaultImage2 from '../../../assets/images/post/default/2.webp';
import defaultImage3 from '../../../assets/images/post/default/3.webp';
import defaultImage4 from '../../../assets/images/post/default/4.webp';
import PostContext from '../../../context/post/PostContext';
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

const FirstCard = ({ post, handleFocus }) => {
    return (
        <>
            <button
                className={`flex-column-relative ${style['card-button']}`}
                onClick={() => {
                    handleFocus(post.id);
                }}
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
        </>
    );
};

const CardChoser = ({ cardIndex, post, handleFocus }) => {
    switch (cardIndex) {
        default: {
            return <FirstCard post={post} handleFocus={handleFocus} />;
        }
        case 0: {
            return <FirstCard post={post} handleFocus={handleFocus} />;
        }
        case 1: {
            return <div>Second card</div>;
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

const Post = ({ standalone, post, postsLength }) => {
    const { handleFocus } = useContext(PostContext);

    const focused = standalone;
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
            <LeftAndRightButtons show={focused} setCardIndex={setCardIndex} />

            <div className={`flex-row-absolute ${style.post}`}>
                <CardChoser
                    cardIndex={cardIndex}
                    post={post}
                    handleFocus={handleFocus}
                />
            </div>
        </section>
    );
};

export default Post;
