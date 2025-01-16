import { useState, useEffect, useContext } from 'react';
import { debug } from '@debug';
import UserContext from './UserContext';
import useSubmit from '../hooks/forms/useSubmit';
import useTokens from '../hooks/authentication/useTokens';
import AlertContext from './alert-context/AlertContext';
import { ACCESS_TOKEN_LIFETIME } from '../utils/constants';

const UserProvider = ({ children }) => {
    // Config
    const showDebugging = true;

    // Contexts
    const { addAlert } = useContext(AlertContext);
    const { submitData } = useSubmit(showDebugging);
    const { refreshAccessToken, getAccessToken } = useTokens(showDebugging);

    // States
    const [profile, setProfile] = useState(null);
    // This is null when the user is loading
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    /**
     * Loads the user's profile and updates authentication state.
     *
     * This function attempts to retrieve the authenticated user's profile
     * from the backend. It first ensures that a valid access token is
     * available. If no valid token is found, the user is marked as
     * unauthenticated. If the profile fetch is successful, the user's profile
     * is stored in state and the user is marked as authenticated.
     *
     * @returns {Promise<void>} Resolves after updating the profile and
     * authentication state.
     */
    const loadProfile = async () => {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            debug(
                true,
                'No valid access token available user is not authenticated.',
                '',
            );
            setIsAuthenticated(false);
            return null;
        }
        // Fetch the user profile
        debug(showDebugging, 'Fetching the user profile', '');
        const response = await submitData({
            relativeURL: '/users/profile/',
            fetchObject: {
                method: 'GET',
                headers: {
                    // eslint-disable-next-line max-len
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            },
            debugMessages: {
                backendError: 'Failed fetching user profile (backend)',
                frontendError: 'Failed fetching user profile (frontend)',
                successfulBackEndResponse: 'Fetched user profile successfully',
            },
        });
        if (response) {
            debug(showDebugging, 'Fetched user profile', response);
            setProfile(response);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    const initLoadProfile = async () => {
        await loadProfile();
    };

    const initRefreshAccessToken = async () => {
        const refreshToken = await refreshAccessToken(showDebugging);
        if (!refreshToken) {
            addAlert(
                'An unexpected error occurred, when trying to keep ' +
                    'you authenticated try refreshing the browser.',
                'Error',
            );
        }
    };

    useEffect(() => {
        let timeId;

        // Load profile
        if (isAuthenticated !== false) {
            initLoadProfile();
        }

        /**
         * Refreshes the access token before expiration
         *
         * @returns {void}
         * @throws Errors must be handled by the caller
         */
        const refreshTokenPeriodically = () => {
            timeId = setTimeout(
                () => {
                    if (isAuthenticated) {
                        debug(
                            true,
                            'Refreshing the access token before expiring.',
                            '',
                        );
                        initRefreshAccessToken();
                        // Re-execute the interval
                        refreshTokenPeriodically();
                    }
                    // Refresh slightly less than the ACCESS_TOKEN_LIFETIME
                },
                (ACCESS_TOKEN_LIFETIME - 1) * 60 * 1000,
            );
        };
        if (isAuthenticated) {
            refreshTokenPeriodically();
        }

        return () => {
            clearTimeout(timeId);
        };

        // initLoadProfile is a stable function that doesn't need to be
        // tracked as a dependency. Including it here could cause unnecessary
        // re-renders and unexpected authentication issues.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <UserContext.Provider
            value={{ profile, isAuthenticated, setIsAuthenticated }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
