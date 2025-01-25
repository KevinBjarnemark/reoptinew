import style from './EllipsisMenuButton.module.css';
import BasicMenu from '../../../../../../../../menus/basic-menu/BasicMenu';
import BorderSeparator from '../../../../../../../../separators/border-separator/BorderSeparator';

const Menu = (props) => {
    const { toggled, handleToggle, postId, renderPost, setEditingPost } =
        props;

    const handleEdit = () => {
        // Close the menu
        handleToggle();
        // Set editing post id
        setEditingPost(postId);
        // Render post
        renderPost(postId);
    };

    return (
        <BasicMenu.Wrapper
            props={{
                toggled: toggled,
                handleToggle,
                name: `Settings ${postId}`,
                top: '5px',
                hideTitle: true,
                hideShadow: true,
            }}
        >
            <BasicMenu.LinkItem
                name="Delete"
                icon="fa-solid fa-trash"
                link="/"
                handleClose={handleToggle}
            />
            <BorderSeparator />
            <BasicMenu.ButtonItem
                name="Edit"
                icon="fa-regular fa-pen-to-square"
                props={{
                    onClick: handleEdit,
                }}
            />
        </BasicMenu.Wrapper>
    );
};

const Button = (props) => {
    return (
        <button className={`flex-row-relative ${style['button']}`} {...props}>
            <div className={style['dot']}></div>
            <div className={style['dot']}></div>
            <div className={style['dot']}></div>
        </button>
    );
};

const EllipsisMenuButton = ({
    show,
    settings,
    postId,
    renderPost,
    setEditingPost,
}) => {
    const handleToggle = () => {
        settings.handleToggle(postId);
    };
    if (show) {
        return (
            <div className={`flex-row-absolute ${style['container']}`}>
                <Button {...{ onClick: handleToggle }} />

                <div className={`flex-column-absolute ${style['menu']}`}>
                    <Menu
                        {...{
                            toggled: settings.toggled,
                            handleToggle,
                            postId,
                            renderPost,
                            setEditingPost,
                        }}
                    />
                </div>
            </div>
        );
    }
};

export default EllipsisMenuButton;
