import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../context/UserContext';
import { getRefreshToken, clearAuthTokens } from '@authentication/accessToken';
import { debug } from '@debug';
import style from './UserCard.module.css';
import useAPI from '@use-api';
import AlertContext from '@alert-context';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import NotificationContext from '@notification-context';

const UserCardButton = () => {
    const { isAuthenticated, profile } = useContext(UserContext);

    const url = useLocation();

    const [buttonText, setButtonText] = useState('Log in/sign up');
    const [buttonLink, setButtonLink] = useState('Log in/sign up');

    useEffect(() => {
        const handleButtonProps = () => {
            if (!isAuthenticated) {
                switch (url.pathname) {
                    default: {
                        setButtonText('Log in/sign up');
                        setButtonLink('/signup');
                        break;
                    }
                    case '/signup': {
                        setButtonText('Log in');
                        setButtonLink('/login');
                        break;
                    }
                    case '/login': {
                        setButtonText('Sign up');
                        setButtonLink('/signup');
                        break;
                    }
                }
            } else {
                setButtonText('Profile');
                setButtonLink(`/profile/${profile?.username}`);
            }
        };
        handleButtonProps();
    }, [url, isAuthenticated, profile]);
    return (
        <Link
            to={buttonLink}
            onClick={() => {
                window.scrollTo(0, 0);
            }}
            className={`flex-column-relative ${style['user-card-button']}`}
        >
            {buttonText}
        </Link>
    );
};

export const UserCard = () => {
    const showDebugging = true;
    const { profile, isAuthenticated, setIsAuthenticated } =
        useContext(UserContext);
    const { addAlert } = useContext(AlertContext);
    const { apiRequest } = useAPI(showDebugging);
    const { addNotification } = useContext(NotificationContext);

    /**
     * Uses the onSubmit hook to submit the logout data to the
     * backend.
     */
    const handlelogOut = async () => {
        // Get the refresh token if it exists
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            debug(showDebugging, 'Refresh token is missing', refreshToken);
            addAlert(
                'Unexpected error, when trying to log you ' +
                    'out. Try refreshing the browser.',
                'Error',
            );
            return null;
        }

        const response = await apiRequest({
            relativeURL: '/users/logout/',
            authorizationHeader: true,
            body: { refresh: refreshToken },
            debugMessages: {
                error: 'Error when attempting to log out',
                successfulBackEndResponse: 'Log out successful',
            },
            uxMessages: {
                error: "Couldn't log you out, try refreshing your browser.",
            },
        });
        if (response) {
            debug(showDebugging, 'Logout successful', response);
            clearAuthTokens();
            debug(showDebugging, 'Removed auth tokens from local storage', '');
            setIsAuthenticated(false);
            await addNotification(true, 'Log out successful.');
        } else {
            await addNotification(false, "Couldn't log you out :(");
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <button
                    className={`flex-column-fixed ${style['log-out-button']}`}
                    onClick={() => {
                        handlelogOut();
                    }}
                >
                    Log out
                </button>
            ) : null}

            <section className={`flex-column-fixed ${style.container}`}>
                <div className={`flex-row-relative ${style['top-bar']}`}>
                    <div
                        className={style['auth-status-indicator']}
                        style={{
                            backgroundColor: isAuthenticated
                                ? '#7dff7f'
                                : '#fc5555',
                        }}
                    ></div>
                    {isAuthenticated
                        ? 'Logged in as a ' +
                          `${profile?.username ? profile?.username : ''}`
                        : 'Viewing as a guest'}
                </div>

                <div className={`flex-column-relative ${style['card-area']}`}>
                    <UserCardButton />
                </div>
            </section>
        </>
    );
};
