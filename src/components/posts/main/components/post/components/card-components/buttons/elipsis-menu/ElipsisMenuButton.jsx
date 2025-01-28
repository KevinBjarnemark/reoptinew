import { useContext } from 'react';
import style from './EllipsisMenuButton.module.css';
import BasicMenu from '../../../../../../../../menus/basic-menu/BasicMenu';
import BorderSeparator from '@border-separator';
import PostContext from '@post-context';
import EditedPostContext from '@edited-post-context';

const Menu = (props) => {
    const { toggled, handleToggle, post } = props;
    const { openEditor, posts } = useContext(PostContext);
    const { setEditedPost } = useContext(EditedPostContext);

    const handleEdit = () => {
        // Close the menu
        handleToggle();
        // Pre-fill values
        const targetedPost = posts.find((i) => i.id === post.id);
        setEditedPost({ data: {}, draft: { ...targetedPost } });
        // Set editing post id
        openEditor(post.id);
    };

    const handleDelete = () => {
        // Close the menu
        handleToggle();
    };

    return (
        <BasicMenu.Wrapper
            props={{
                toggled: toggled,
                handleToggle,
                name: `Settings ${post.id}`,
                top: '5px',
                hideTitle: true,
                hideShadow: true,
            }}
        >
            <BasicMenu.ButtonItem
                name="Delete"
                icon="fa-solid fa-trash"
                props={{ onClick: handleDelete }}
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

const EllipsisMenuButton = (props) => {
    const { post, show, settings } = props;

    const handleToggle = () => {
        settings.handleToggle(post.id);
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
                            post,
                        }}
                    />
                </div>
            </div>
        );
    }
};

export default EllipsisMenuButton;
