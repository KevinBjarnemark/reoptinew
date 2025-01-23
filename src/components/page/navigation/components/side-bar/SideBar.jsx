import { useState, useContext } from 'react';
import BorderSeparator from '@border-separator';
import useAPI from '@use-api';
import useSimulateLoading from '@use-simulate-loading';
import NotificationContext from '@notification-context';
import { debug } from '@debug';
import NavMenu from '../nav-menu/NavMenu';
import UserContext from '../../../../../context/UserContext';

const Links = (props) => {
    const { toggled, setToggled } = props;
    const { profile } = useContext(UserContext);

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
                    link="/"
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
                {profile?.username ? (
                    <NavMenu.LinkItem
                        name="Profile"
                        icon="fa-solid fa-user"
                        link={`/profile/${profile?.username}`}
                        handleClose={handleToggle}
                    />
                ) : null}
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
        title: 'Test post 10',
        description: 'Test description',
        instructions: 'Test instructions',
        harmful_materials: JSON.stringify([
            'Corrosive Materials',
            'Flammable Materials',
            'Chemical Substances',
            'Radioactive Materials',
        ]),
        harmful_tools: JSON.stringify(['Sharp or Cutting Tools']),
        materials: JSON.stringify([
            {
                quantity: '10',
                name: 'wooden boards',
                description: 'Any wood type will do',
            },
            {
                quantity: 'A couple of',
                name: 'nails',
                description: 'Stainless 2 inches long',
            },
        ]),
        tools: JSON.stringify([
            {
                quantity: '1',
                name: 'Screw driver',
                description: 'Manual or electric',
            },
        ]),
    };

    const createPost = async () => {
        await simulateLoading();
        const response = await apiRequest({
            validateForm,
            formDataDraft,
            relativeURL: '/posts/posts/',
            debugMessages: {
                error: 'Error when creating a post',
                successfulBackEndResponse: 'Created post successfully',
            },
            uxMessages: {
                error: "Couldn't create post",
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
