import { useContext, useState } from 'react';
import style from './Post.module.css';
import sharedStyles from './SharedStyles.module.css';
import PostContext from '../../../../../context/post/PostContext';
import UserContext from '../../../../../context/UserContext';
// Cards
import FrontCard from './components/cards/cards/front-card/FrontCard';
import DescriptionCard from './components/cards/cards/description-card/DescriptionCard';
import MaterialsCard from './components/cards/cards/materials-card/MaterialsCard';
import ToolsCard from './components/cards/cards/tools-card/ToolsCard';
import InstructionsCard from './components/cards/cards/instructions-card/InstructionsCard';
// Card components
import LeftAndRightButtons from './components/card-components/left-and-right-buttons/LeftAndRightButtons';
import EllipsisMenuButton from './components/card-components/buttons/elipsis-menu-button/ElipsisMenuButton';
import UserProfile from './components/card-components/buttons/user-profile/UserProfile';
import AgeRestriction from './components/card-components/buttons/age-restriction/AgeRestriction';

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
            <UserProfile
                image={post?.author?.image}
                username={post?.author?.username}
            />

            {focused ? (
                <AgeRestriction
                    harmfulMaterials={post?.harmful_materials}
                    harmfulTools={post?.harmful_tools}
                />
            ) : null}
        </section>
    );
};

export default Post;
