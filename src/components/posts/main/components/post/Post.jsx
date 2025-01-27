import { useContext, useState, useEffect } from 'react';
import style from './Post.module.css';
import PostContext from '@post-context';
import UserContext from '../../../../../context/UserContext';
import ScreenContext from '@screen-context';
// Cards
import FrontCard from '@c/front-card/FrontCard';
import DescriptionCard from '@c/description-card/DescriptionCard';
import MaterialsCard from '@c/materials-card/MaterialsCard';
import ToolsCard from '@c/tools-card/ToolsCard';
import InstructionsCard from '@c/instructions-card/InstructionsCard';
// Card components
import CardToggler from '@c-c/buttons/card-toggler/CardToggler';
import EllipsisMenuButton from '@c-c/buttons/elipsis-menu/ElipsisMenuButton';
import UserProfile from '@c-c/buttons/user-profile/UserProfile';
import AgeRestriction from '@c-c/buttons/age-restriction/AgeRestriction';
import ModeLabel from '@c-c/labels/mode-label/ModeLabel';
import PickerPanel from '@c-c/panels/picker-panel/PickerPanel';

const CardChoser = (props) => {
    const {
        cardIndex,
        post,
        standalone,
        editMode,
        editedPostRef,
        defaultImageIndex,
    } = props;
    // Shared props
    const sharedProps = { post, standalone, editMode, editedPostRef };

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
    }
};

const Post = ({ standalone, post, settings }) => {
    // Contexts
    const { profile } = useContext(UserContext);
    const { editingPost, editedPostRef } = useContext(PostContext);
    // States
    const [cardIndex, setCardIndex] = useState(0);
    const [defaultImageIndex, setDefaultImageIndex] = useState(
        post?.default_image_index ? post.default_image_index : 1,
    );
    // Variables
    const isAuthor = profile?.user_id === post?.author?.id;
    const editMode = editingPost === post?.id;

    // Update default_image_index when it's state changes
    useEffect(() => {
        editedPostRef.current.draft.default_image_index = defaultImageIndex;

        // Ignoring editedPostRef as a dependency because React doesn't
        // track changes to refs, and adding it here would have no effect.
        // This useEffect only needs to re-run when defaultImageIndex changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultImageIndex]);

    const { screenWidth } = useContext(ScreenContext);

    // Enlarge the component when in standalone mode
    const standaloneStyle = standalone
        ? {
              zIndex: 2,
              position: 'fixed',
              width: screenWidth <= 650 ? '90%' : '60%',
              top: screenWidth <= 650 ? '60%' : '50%',
              left: '50%',
              height: 'auto', // Compatibility fix!
              transform: 'translate(-50%, -50%)',
          }
        : {
              zIndex: settings?.toggled === `Settings ${post.id}` ? 1000 : 0,
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
                    editedPostRef,
                    defaultImageIndex,
                }}
            />
            <CardToggler {...{ show: standalone, setCardIndex }} />
            <UserProfile
                image={post?.author?.image}
                username={post?.author?.username}
            />
            {standalone ? (
                <AgeRestriction
                    harmfulMaterials={post?.harmful_materials}
                    harmfulTools={post?.harmful_tools}
                />
            ) : null}

            {/* Only visible if the user is the author */}
            <EllipsisMenuButton
                {...{ post, show: !standalone && isAuthor, settings }}
            />

            {/* Edit mode label, only visible when editing in 
                standalone */}
            {standalone && editingPost === post.id ? (
                <ModeLabel labelText="Edit Mode" />
            ) : null}

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
