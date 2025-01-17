import { useState, useContext } from 'react';
import BorderSeparator from '@border-separator';
import useAPI from '../../../../../hooks/forms/useAPI';
import useSimulateLoading from '@useSimulateLoading';
import NotificationContext from '@notification-context';
import { debug } from '@debug';
import NavMenu from '../nav-menu/NavMenu';

const Links = (props) => {
    const { toggled, setToggled } = props;

    const handleToggle = () => {
        setToggled((prev) => (prev === 'Navigation' ? '' : 'Navigation'));
    };

    return (
        <>
            <NavMenu.Wrapper
                props={{
                    toggled,
                    handleToggle,
                    top: '35px',
                    name: 'Navigation',
                }}
            >
                <NavMenu.LinkItem
                    name="Home"
                    icon="fa-solid fa-house"
                    link="/home"
                    handleClose={handleToggle}
                />
                <BorderSeparator />
                <NavMenu.LinkItem
                    name="About"
                    icon="fa-solid fa-circle-info"
                    link="/about"
                    handleClose={handleToggle}
                />
                <BorderSeparator />
                <NavMenu.LinkItem
                    name="Profile"
                    icon="fa-solid fa-user"
                    link="/profile"
                    handleClose={handleToggle}
                />
            </NavMenu.Wrapper>

            <NavMenu.NavButton
                buttonProps={{ onClick: handleToggle }}
                icon="fa-solid fa-bars"
            />
        </>
    );
};

const Create = (props) => {
    const showDebugging = true;
    const { toggled, setToggled } = props;
    const { apiRequest } = useAPI(true);
    const { simulateLoading } = useSimulateLoading(showDebugging);
    const { addNotification } = useContext(NotificationContext);

    const handleToggle = () => {
        setToggled((prev) => (prev === 'Create' ? '' : 'Create'));
    };

    const validateForm = () => {
        return true;
    };

    // TEMPORARY
    const formDataDraft = {
        title: 'Test post',
        description: 'Test description',
        instructions: 'Test instructions',
    };

    const createPost = async () => {
        await simulateLoading();
        const response = await apiRequest({
            validateForm,
            formDataDraft,
            relativeURL: '/posts/posts/',
            debugMessages: {
                backendError: 'Post creation failed (backend)',
                frontendError: 'Post creation failed (frontend)',
                successfulBackEndResponse: 'Post creation successful',
            },
            authorizationHeader: true,
        });

        if (response) {
            debug(showDebugging, 'Post posted successfully', response);
            await addNotification(true, 'Posted!');
        } else {
            debug(showDebugging, "Couldn't create post (backend)", response);
            await addNotification(false, "Couldn't create post :(");
        }
    };

    return (
        <>
            <NavMenu.Wrapper
                props={{ toggled, handleToggle, top: '115px', name: 'Create' }}
            >
                <NavMenu.ButtonItem
                    name="Create post"
                    icon="fa-solid fa-plus"
                    props={{
                        onClick: () => {
                            createPost();
                            handleToggle();
                        },
                    }}
                />
                <BorderSeparator />
            </NavMenu.Wrapper>

            <NavMenu.NavButton
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
            <Create {...{ toggled, setToggled }} />
        </>
    );
};

export default SideBar;
