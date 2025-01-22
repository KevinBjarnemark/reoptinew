import { useContext, useState } from 'react';
import style from './Post.module.css';
import sharedStyles from './SharedStyles.module.css';
import PostContext from '../../../../../context/post/PostContext';
import UserContext from '../../../../../context/UserContext';
import defaultAvatarImage from '../../../../../assets/images/user/default-avatar.webp';
import { Link } from 'react-router-dom';
import useNeutralizeApp from '@use-neutralize-app';
// Cards
import FrontCard from './components/cards/cards/front-card/FrontCard';
import DescriptionCard from './components/cards/cards/description-card/DescriptionCard';
import MaterialsCard from './components/cards/cards/materials-card/MaterialsCard';
import ToolsCard from './components/cards/cards/tools-card/ToolsCard';
import InstructionsCard from './components/cards/cards/instructions-card/InstructionsCard';
// Card components
import LeftAndRightButtons from './components/card-components/left-and-right-buttons/LeftAndRightButtons';
import EllipsisMenuButton from './components/card-components/buttons/elipsis-menu-button/ElipsisMenuButton';

const CardChoser = ({ cardIndex, post, renderPost, focused }) => {
    switch (cardIndex) {
        default: {
            return (
                <FrontCard
                    post={post}
                    renderPost={renderPost}
                    focused={focused}
                />
            );
        }
        case 0: {
            return (
                <FrontCard
                    post={post}
                    renderPost={renderPost}
                    focused={focused}
                />
            );
        }
        case 1: {
            return <DescriptionCard post={post} focused={focused} />;
        }
        case 2: {
            return <MaterialsCard post={post} focused={focused} />;
        }
        case 3: {
            return <ToolsCard post={post} focused={focused} />;
        }
        case 4: {
            return <InstructionsCard post={post} focused={focused} />;
        }
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
                src={src ? src : defaultAvatarImage}
                alt="Profile image"
            />
        </div>
    );
};

const UserBadge = ({ image, username }) => {
    const { neutralizeApp } = useNeutralizeApp();
    const { handleClosePost } = useContext(PostContext);

    return (
        <Link
            className={`flex-row-absolute ${style['user-badge']}`}
            onClick={() => {
                neutralizeApp();
                handleClosePost();
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
    const { renderPost } = useContext(PostContext);
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
                renderPost={renderPost}
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
