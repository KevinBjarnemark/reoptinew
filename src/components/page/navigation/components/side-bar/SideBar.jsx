import { useState, useContext } from 'react';
import BorderSeparator from '@border-separator';
import NotificationContext from '@notification-context';
import BasicMenu from '@basic-menu';
import UserContext from '../../../../../context/UserContext';
import NavButton from '../buttons/nav-button/NavButton';
import { DEFAULT_POST } from '@constants';
import AlertContext from '@alert-context';
import PostContext from '@post-context';
import EditedPostContext from '@edited-post-context';
import PageDimContext from '@page-dim-context';
import AppCloseButtonContext from '@app-close-button-context';
import { debug } from '@debug';
import PostSearchContext from '@post-search-context';

const Links = (props) => {
    const { toggled, setToggled } = props;
    const { profile } = useContext(UserContext);

    const handleToggle = () => {
        setToggled((prev) => (prev === 'Navigation' ? '' : 'Navigation'));
    };

    return (
        <>
            <BasicMenu.Wrapper
                props={{
                    toggled,
                    handleToggle,
                    top: '35px',
                    name: 'Navigation',
                }}
            >
                <BasicMenu.LinkItem
                    name="Home"
                    icon="fa-solid fa-house"
                    link="/"
                    handleClose={handleToggle}
                />
                <BorderSeparator />
                <BasicMenu.LinkItem
                    name="About"
                    icon="fa-solid fa-circle-info"
                    link="/about"
                    handleClose={handleToggle}
                />
                <BorderSeparator />
                {profile?.username ? (
                    <BasicMenu.LinkItem
                        name="Profile"
                        icon="fa-solid fa-user"
                        link={`/profile/${profile?.username}`}
                        handleClose={handleToggle}
                    />
                ) : null}
            </BasicMenu.Wrapper>

            <NavButton
                buttonProps={{ onClick: handleToggle }}
                icon="fa-solid fa-bars"
            />
        </>
    );
};

const Search = (props) => {
    const { toggled, setToggled } = props;
    const { setShowSeachWindow } = useContext(PostSearchContext);

    const handleToggle = () => {
        setToggled((prev) => (prev === 'Search' ? '' : 'Search'));
    };

    return (
        <>
            <BasicMenu.Wrapper
                props={{ toggled, handleToggle, top: '115px', name: 'Search' }}
            >
                <BasicMenu.ButtonItem
                    name="Search"
                    icon="fa-solid fa-magnifying-glass"
                    props={{
                        onClick: () => {
                            setShowSeachWindow((prev) => !prev);
                            handleToggle();
                        },
                    }}
                />
                <BorderSeparator />
                <BasicMenu.ButtonItem
                    name="Find a user"
                    icon="fa-solid fa-magnifying-glass"
                    props={{
                        onClick: () => {
                            handleToggle();
                        },
                    }}
                />
            </BasicMenu.Wrapper>

            <NavButton
                buttonProps={{ onClick: handleToggle }}
                icon="fa-solid fa-magnifying-glass"
            />
        </>
    );
};

const Create = (props) => {
    const showDebugging = true;
    const { toggled, setToggled } = props;
    const { addNotification } = useContext(NotificationContext);
    const { setSinglePost, setCreatingPost, setEditingPost } =
        useContext(PostContext);
    const { setEditedPost } = useContext(EditedPostContext);
    const { addAlert } = useContext(AlertContext);
    const { isAuthenticated, profile } = useContext(UserContext);
    const { setDim } = useContext(PageDimContext);
    const { setShowAppCloseButton } = useContext(AppCloseButtonContext);

    const handleToggle = () => {
        setToggled((prev) => (prev === 'Create' ? '' : 'Create'));
    };

    const handleCreateButton = async () => {
        try {
            debug(
                't',
                showDebugging,
                'User clicked the create post button.',
                '',
            );
            if (!isAuthenticated) {
                addAlert('You must log in to create a post.', 'Info');
                await addNotification(false, 'You must log in!');
                return null;
            }
            // Pre-fill values and set the single post data
            const postTemplate = {
                ...DEFAULT_POST,
                author: {
                    id: profile.id,
                    username: profile.username,
                    image: profile.image,
                },
            };
            setEditedPost({ data: {}, draft: { ...postTemplate } });
            setSinglePost({ ...postTemplate });
            setEditingPost(postTemplate.id);
            // Dim the app and load the close button
            setDim(true);
            setShowAppCloseButton(true);
            // Turn create mode ON
            setCreatingPost(true);
            await addNotification(true, 'Template loaded');
            // Avoid showing the info message immediately
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 200);
            });
            // Guide the user
            addAlert('Go to the last card to submit you edits.', 'Info');
        } catch (error) {
            addAlert(
                'Something went wrong when trying to load the ' +
                    'create post template. Try refreshing your browser.',
                'Error',
            );
            debug(
                'e',
                showDebugging,
                "Couln't load the create post template",
                error,
            );
            await addNotification(false, 'Error...');
        }
    };

    return (
        <>
            <BasicMenu.Wrapper
                props={{ toggled, handleToggle, top: '195px', name: 'Create' }}
            >
                <BasicMenu.ButtonItem
                    name="Create post"
                    icon="fa-solid fa-plus"
                    props={{
                        onClick: () => {
                            handleCreateButton();
                            handleToggle();
                        },
                    }}
                />
            </BasicMenu.Wrapper>

            <NavButton
                buttonProps={{ onClick: handleToggle }}
                icon="fa-solid fa-plus"
            />
        </>
    );
};

const SideBar = () => {
    const [toggled, setToggled] = useState('');

    return (
        <>
            <Links {...{ toggled, setToggled }} />
            <Search {...{ toggled, setToggled }} />
            <Create {...{ toggled, setToggled }} />
        </>
    );
};

export default SideBar;
