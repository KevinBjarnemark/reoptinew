/**
 * Gets the refresh token from local storage.
 *
 * @returns {string|null} The token string if it exists, otherwise null
 */
export const getRefreshToken = () => {
    // Get the refresh token if it exists
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        return null;
    }
    return refreshToken;
};

/**
 * Clears all authentication tokens from local storage.
 *
 * This function can be used to quickly clear the user
 * after a logout. This simulates an immediate log out
 * while authentication tokens are still active.
 *
 */
export const clearAuthTokens = () => {
    // Remove auth tokens from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};
