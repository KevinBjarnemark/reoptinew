import { useContext, useState } from 'react';
import style from './Post.module.css';
import PostContext from '@post-context';
import UserContext from '@user-context';
import ScreenContext from '@screen-context';
// Cards
import FrontCard from '@c/front-card/FrontCard';
import DescriptionCard from '@c/description-card/DescriptionCard';
import MaterialsCard from '@c/materials-card/MaterialsCard';
import ToolsCard from '@c/tools-card/ToolsCard';
import InstructionsCard from '@c/instructions-card/InstructionsCard';
import SafetyCard from '@c/safety-card/SafetyCard';
import TagsCard from '@c/tags-card/TagsCard';
import SubmitCard from '@c/submit-card/SubmitCard';
// Card components
import CardToggler from '@c-c/buttons/card-toggler/CardToggler';
import EllipsisMenuButton from '@c-c/buttons/elipsis-menu/ElipsisMenuButton';
import UserProfile from '@c-c/buttons/user-profile/UserProfile';
import AgeRestriction from '@c-c/buttons/age-restriction/AgeRestriction';
import ModeLabel from '@c-c/labels/mode-label/ModeLabel';
import PickerPanel from '@c-c/panels/picker-panel/PickerPanel';
import { POST_UNIQUE_ID_CREATE } from '@constants';

const CardChoser = (props) => {
    const { cardIndex, post, standalone, editMode, defaultImageIndex } = props;
    // Shared props
    const sharedProps = { post, standalone, editMode };

    // Front card props
    const frontCardProps = { ...sharedProps, defaultImageIndex };

    switch (cardIndex) {
        default: {
            return <FrontCard {...frontCardProps} />;
        }
        case 0: {
            return <FrontCard {...frontCardProps} />;
        }
        case 1: {
            return <DescriptionCard {...sharedProps} />;
        }
        case 2: {
            return <MaterialsCard {...sharedProps} />;
        }
        case 3: {
            return <ToolsCard {...sharedProps} />;
        }
        case 4: {
            return <InstructionsCard {...sharedProps} />;
        }
        case 5: {
            return <TagsCard {...sharedProps} />;
        }
        case 6: {
            if (editMode) {
                return <SafetyCard {...sharedProps} />;
            }
            return null;
        }
        case 7: {
            if (editMode) {
                return <SubmitCard {...sharedProps} />;
            }
            return null;
        }
    }
};

const Post = ({ standalone, post, settings = {}, postsMaxLength = 0 }) => {
    // Contexts
    const { profile } = useContext(UserContext);
    const { editingPost, creatingPost } = useContext(PostContext);
    const { screenWidth } = useContext(ScreenContext);
    // States
    const [cardIndex, setCardIndex] = useState(0);
    // This useState is defaulted to 1 if the default_image_index
    // is missing.
    const [defaultImageIndex, setDefaultImageIndex] = useState(
        post?.default_image_index !== null ? post.default_image_index : 1,
    );
    // Variables
    const isAuthor = profile?.user_id === post?.author?.id;
    const editMode =
        (standalone && editingPost === post?.id) ||
        post.id === POST_UNIQUE_ID_CREATE;

    // Enlarge the component when in standalone mode
    const standaloneStyle = standalone
        ? {
              zIndex: 4,
              position: 'fixed',
              width: screenWidth <= 650 ? '90%' : '60%',
              top: screenWidth <= 650 ? '60%' : '50%',
              left: '50%',
              height: 'auto', // Compatibility fix!
              transform: 'translate(-50%, -50%)',
          }
        : {
              zIndex:
                  settings?.toggled === `Settings ${post.id}`
                      ? postsMaxLength + 1
                      : 0,
              margin: '30px 10px',
          };

    return (
        <section
            className={`flex-row-relative ${style['post-under']}`}
            style={{ ...standaloneStyle }}
        >
            <CardChoser
                {...{
                    cardIndex,
                    post,
                    standalone,
                    editMode,
                    defaultImageIndex,
                }}
            />
            <CardToggler {...{ show: standalone, setCardIndex, editMode }} />
            <UserProfile
                image={post?.author?.image}
                username={post?.author?.username}
            />
            {standalone ? (
                <AgeRestriction
                    harmfulPost={post?.harmful_post}
                    harmfulMaterialCategories={
                        post?.harmful_material_categories
                    }
                    harmfulToolCategories={post?.harmful_tool_categories}
                />
            ) : null}

            {/* Only visible if the user is the author */}
            <EllipsisMenuButton
                {...{ post, show: !standalone && isAuthor, settings }}
            />

            {/* Edit mode label, only visible when editing in 
                standalone */}
            {editMode ? (
                <ModeLabel
                    labelText={creatingPost ? 'Create mode' : 'Edit Mode'}
                    color={creatingPost ? '#a0e2f1' : '#ffc073'}
                />
            ) : null}

            {/* Default images toggler */}
            <PickerPanel
                {...{
                    show: editMode && cardIndex === 0,
                    index: defaultImageIndex,
                    setIndex: setDefaultImageIndex,
                    maxLength: 4,
                    label: 'Pick a default image',
                }}
            />
        </section>
    );
};

export default Post;
