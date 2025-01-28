import { debug } from '@debug';
import useAPI from '@use-api';
import { getRefreshToken } from '@authentication/accessToken';

const useTokens = (showDebugging = true) => {
    const { apiRequest } = useAPI(showDebugging);

    /**
     * Retrieves the access token from local storage or refreshes it
     * if unavailable.
     *
     * This function checks for an existing access token in local storage. If
     * no access token is found, it attempts to refresh the token.
     *
     * @returns {Promise<string|null>} The access token, either from
     * local storage or refreshed, or null if no valid token is available.
     */
    const getAccessToken = async () => {
        const showDebugging = true;
        debug(
            'd',
            showDebugging,
            'Getting the access token, if it exists.',
            '',
        );
        let accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            debug(
                'd',
                showDebugging,
                'Found the access token (local storage):',
                accessToken,
            );
            return accessToken;
        } else {
            debug(
                'd',
                showDebugging,
                "Couldn't find the access token (local storage)" +
                    ', refreshing it now:',
                accessToken,
            );
            const refreshedAccessToken = await refreshAccessToken();
            if (refreshedAccessToken) {
                debug(
                    'd',
                    showDebugging,
                    'Refreshed access token.',
                    refreshedAccessToken,
                );
                return refreshedAccessToken;
            }
        }
        return null;
    };

    /**
     * Refreshes the access token using the stored refresh token.
     *
     * This function attempts to retrieve a new access token by making a POST
     * request with the refresh token. If successful, the new access token is
     * stored in localStorage.
     *
     * @returns {Promise<string|null>} The refreshed access token if
     * successful, or null if the refresh token is missing, invalid, or the
     * request fails.
     */
    const refreshAccessToken = async () => {
        // Get the refresh token if it exists
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            debug(
                'd',
                showDebugging,
                'Refresh token is missing.',
                refreshToken,
            );
            return null;
        }

        // Fetch a new access token
        debug(
            'd',
            showDebugging,
            'Attempting to fetch a new access token.',
            '',
        );
        const response = await apiRequest({
            relativeURL: '/users/api/token/refresh/',
            method: 'POST',
            body: { refresh: refreshToken },
            debugMessages: {
                error: 'Error when fetching access token',
                successfulBackEndResponse: 'Fetched access token successfully',
            },
            uxMessages: {
                error:
                    'Something went wrong in our authentication system, ' +
                    'please refresh your browser.',
            },
        });
        if (response) {
            // Update access token (local storage)
            const accessToken = response.access;
            const refreshToken = response.refresh;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            debug(
                'd',
                showDebugging,
                'Refreshed both the access and refresh token (local storage).',
                '',
            );
            return response.access;
        } else {
            debug(
                'e',
                showDebugging,
                "Couldn't refresh access token:",
                response,
            );
            return null;
        }
    };

    return { refreshAccessToken, getAccessToken };
};

export default useTokens;
