import { useState, useContext } from 'react';
import BorderSeparator from '@border-separator';
import useAPI from '@use-api';
import useSimulateLoading from '@use-simulate-loading';
import NotificationContext from '@notification-context';
import { debug } from '@debug';
import BasicMenu from '../../../../menus/basic-menu/BasicMenu';
import UserContext from '../../../../../context/UserContext';
import NavButton from '../buttons/nav-button/NavButton';

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
        harmful_material_categories: JSON.stringify([
            'Corrosive Materials',
            'Flammable Materials',
            'Chemical Substances',
            'Radioactive Materials',
        ]),
        harmful_tool_categories: JSON.stringify(['Sharp or Cutting Tools']),
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
            debug('s', showDebugging, 'Post posted successfully:', response);
            await addNotification(true, 'Posted!');
        } else {
            debug(
                'e',
                showDebugging,
                "Couldn't create post (backend):",
                response,
            );
            await addNotification(false, "Couldn't create post :(");
        }
    };

    return (
        <>
            <BasicMenu.Wrapper
                props={{ toggled, handleToggle, top: '115px', name: 'Create' }}
            >
                <BasicMenu.ButtonItem
                    name="Create post"
                    icon="fa-solid fa-plus"
                    props={{
                        onClick: () => {
                            createPost();
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
            <Create {...{ toggled, setToggled }} />
        </>
    );
};

export default SideBar;
