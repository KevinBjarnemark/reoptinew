import { useState, useEffect, useContext } from 'react';
import { debug } from '@debug';
import UserContext from './UserContext';
import useAPI from '@use-api';
import useTokens from '../hooks/authentication/useTokens';
import AlertContext from '@alert-context';
import { ACCESS_TOKEN_LIFETIME } from '../utils/constants';

const UserProvider = ({ children }) => {
    // Config
    const showDebugging = true;

    // Contexts
    const { addAlert } = useContext(AlertContext);
    const { apiRequest } = useAPI(showDebugging);
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
     * @param {bool} refreshTokenBeforeStart Set this to true if you want to
     * refresh the accesstoken before loading the profile.
     * @returns {Promise<bool|null>} Resolves after updating the profile and
     * authentication state.
     * @throws Errors must be handled by the caller
     */
    const loadProfile = async (refreshTokenBeforeStart) => {
        if (refreshTokenBeforeStart) {
            await refreshAccessToken(showDebugging);
        }
        const accessToken = await getAccessToken();
        if (!accessToken) {
            debug(
                'd',
                showDebugging,
                'No valid access token available user is not authenticated.',
                '',
            );
            setIsAuthenticated(false);
            return null; // Indicate guest mode
        }
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
            // We'll try to load the profile 2 times, see frontend error
            // handling in initLoadProfile.
            skipUxErrors: true,
            uxMessages: null,
        });
        if (response) {
            debug('s', showDebugging, 'Fetched user profile:', response);
            setProfile(response);
            setIsAuthenticated(true);
            return true; // Indicate success
        } else {
            setIsAuthenticated(false);
            return false; // Indicate failure
        }
    };

    const initLoadProfile = async () => {
        const loadedProfile = await loadProfile(false);
        if (loadedProfile === false) {
            // The user may have outdated tokens, refresh and reload
            // the profile
            const loadedProfileSecondAttempt = await loadProfile(true);
            if (loadedProfileSecondAttempt === false) {
                addAlert(
                    'An unexpected error occurred, when trying to keep ' +
                        'you authenticated, try refreshing the browser.',
                    'Error',
                );
            }
        }
    };

    const initRefreshAccessToken = async () => {
        const refreshToken = await refreshAccessToken(showDebugging);
        if (!refreshToken) {
            addAlert(
                'An unexpected error occurred, when trying to keep ' +
                    'you authenticated, try refreshing the browser.',
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
            const bufferTime = 3;

            timeId = setTimeout(
                () => {
                    if (isAuthenticated) {
                        debug(
                            'd',
                            true,
                            'Refreshing the access token before expiring.',
                            '',
                        );
                        initRefreshAccessToken();
                        // Re-execute the interval
                        refreshTokenPeriodically();
                    }
                }, // Refresh slightly less than the ACCESS_TOKEN_LIFETIME
                (ACCESS_TOKEN_LIFETIME - bufferTime) * 60 * 1000,
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
