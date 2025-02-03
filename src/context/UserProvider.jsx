import { useState, useEffect, useContext, useRef } from 'react';
import { debug } from '@debug';
import UserContext from './UserContext';
import useAPI from '@use-api';
import { validateCommon } from '../functions/validation/validate';
import { useNavigate } from 'react-router-dom';
import NotificationContext from '@notification-context';
import { ACCESS_TOKEN_LIFETIME } from '@constants';

const UserProvider = ({ children }) => {
    // Config
    const showDebugging = true;
    // Contexts
    const { apiRequest } = useAPI(showDebugging);
    // States
    const userHasInitialized = useRef(false);
    const [profile, setProfile] = useState(null);
    // This is null when the user is loading
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const navigate = useNavigate();
    const { addNotification } = useContext(NotificationContext);

    const removeTokens = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };
    const setTokens = (access, refresh) => {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    };
    const getTokens = () => {
        return {
            access: localStorage.getItem('access_token'),
            refresh: localStorage.getItem('refresh_token'),
        };
    };

    const loadProfile = async () => {
        // Fetch the user profile
        debug('d', showDebugging, 'Fetching the user profile.', '');
        const response = await apiRequest({
            relativeURL: '/users/profile/',
            authorizationHeader: true,
            method: 'GET',
            debugMessages: {
                error: 'Error when fetching user profile.',
                successfulBackEndResponse: 'Fetched user profile successfully',
            },
            uxMessages: null,
        });
        if (response) {
            debug('s', showDebugging, 'Fetched user profile:', response);
            setProfile(response);
            setIsAuthenticated(true);
        } else {
            removeTokens();
            setIsAuthenticated(false);
        }
    };

    const initializeUser = async () => {
        const init = async () => {
            const tokens = getTokens();

            // User is guest because there's no access token
            if (!tokens.access || !tokens.refresh) {
                debug(
                    'd',
                    showDebugging,
                    'No valid access token available user is not ' +
                        'authenticated.',
                    '',
                );
                // Make sure localstorage is cleared
                removeTokens();
                setIsAuthenticated(false);
            }
            // User has tokens but they need to be validated
            else {
                debug('d', showDebugging, 'Tokens found, validating ...', '');
                const response = await apiRequest({
                    relativeURL: '/users/api/token/refresh/',
                    method: 'POST',
                    body: { refresh: tokens.refresh },
                    debugMessages: {
                        error: "Couldn't fetch access token",
                        successfulBackEndResponse:
                            'Fetched access token successfully',
                    },
                    uxMessages: {
                        error:
                            'Something went wrong in our  ' +
                            'authentication system, please refresh ' +
                            'your browser.',
                    },
                });
                if (response) {
                    // Update tokens token (local storage)
                    setTokens(response.access, response.refresh);
                    await loadProfile();
                    setIsAuthenticated(true);

                    debug(
                        'd',
                        showDebugging,
                        'Refreshed both the access and refresh token ' +
                            '(local storage).',
                        '',
                    );

                    debug(
                        'l',
                        showDebugging,
                        ' setIsAuthenticated(true);',
                        response,
                    );
                } else {
                    debug(
                        'e',
                        showDebugging,
                        "Couldn't refresh tokens removing clearing tokens ...",
                        response,
                    );
                    // Make sure localstorage is cleared
                    removeTokens();
                    setIsAuthenticated(false);
                }
            }
        };

        await init();
    };

    const login = async (formDataDraft) => {
        const response = await apiRequest({
            validateForm: () => {
                validateCommon(formDataDraft);
            },
            formDataDraft,
            relativeURL: '/users/login/',
            debugMessages: {
                error: "Couldn't log in user",
                successfulBackEndResponse: 'Log in successful',
            },
            uxMessages: {
                error: "Couldn't log you in, try refreshing your browser.",
            },
        });
        if (response) {
            setTokens(response.access, response.refresh);
            await loadProfile();
            // Mark the user as authenticated
            setIsAuthenticated(true);
            navigate('/');
            window.scrollTo(0, 0);
            await addNotification(true, 'Authenticated!');
        } else {
            debug(
                'd',
                showDebugging,
                "Backend didn't accept user log in request.",
                response,
            );
            await addNotification(false, 'Authentication failed.');
        }
    };

    const signup = async (validateForm, formDataDraft) => {
        const response = await apiRequest({
            validateForm,
            formDataDraft,
            relativeURL: '/users/signup/',
            debugMessages: {
                error: "Couldn't sign up user",
                successfulBackEndResponse: 'Sign up successful',
            },
            uxMessages: {
                error: "Couldn't sign you up, try refreshing your browser. ",
            },
        });
        if (response) {
            setTokens(response.access, response.refresh);
            await loadProfile();
            await addNotification(true, 'Welcome!');
            setIsAuthenticated(true);
            navigate(`/profile/${formDataDraft.username}`);
            window.scrollTo(0, 0);
        } else {
            await addNotification(false, "Couldn't sign you up :(");
        }
    };

    const handleFollow = async (action, userId) => {
        const response = await apiRequest({
            authorizationHeader: true,
            method: action === 'follow' ? 'POST' : 'DELETE',
            relativeURL: `/users/follow/${userId}/`,
            debugMessages: {
                error: `Couldn't ${action} user`,
                successfulBackEndResponse: `User ${action} successful`,
            },
            uxMessages: {
                error: `Couldn't ${action} this user, try refreshing your browser.`,
            },
        });
        if (response) {
            await addNotification(
                true,
                action === 'follow' ? 'Followed!' : 'Unfollowed',
            );
        } else {
            debug(
                'd',
                showDebugging,
                `Backend didn't accept user ${action}.`,
                response,
            );
            await addNotification(false, `User ${action} failed.`);
        }
    };

    useEffect(() => {
        if (isAuthenticated === null) {
            if (!userHasInitialized.current) {
                userHasInitialized.current = true;
                initializeUser();
            }
        }

        // `initializeUser` is a stable function in itself not a dependency.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
        let timeId;
        /**
         * Refreshes the access token before expiration
         *
         * @returns {void}
         * @throws Errors must be handled by the caller
         */
        const refreshTokenPeriodically = () => {
            const bufferTime = 3;

            timeId = setTimeout(
                () => {
                    debug(
                        'd',
                        true,
                        'Refreshing the access token before expiring.',
                        '',
                    );
                    initializeUser();
                    refreshTokenPeriodically();
                }, // Refresh slightly less than the ACCESS_TOKEN_LIFETIME
                (ACCESS_TOKEN_LIFETIME - bufferTime) * 60 * 1000,
            );
        };
        if (isAuthenticated !== null) {
            refreshTokenPeriodically();
        }

        return () => {
            clearTimeout(timeId);
        };
        // `initializeUser` is a stable function in itself not a dependency.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <UserContext.Provider
            value={{
                profile,
                isAuthenticated,
                setIsAuthenticated,
                login,
                signup,
                handleFollow,
                setProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
