import {debug} from '../../utils/log';
import { fetchAPI } from "../../utils/fetch";

/**
 * Simply gets the refresh token from local storage. 
 * 
 * @returns {string|null} The token string if it exists, otherwise null
 */
export const getRefreshToken = () => {
    // Get the refresh token if it exists
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        return null;
    }
    return refreshToken;
};

/**
 * Refreshes the access token using the stored refresh token.
 * 
 * This function attempts to retrieve a new access token by making a POST 
 * request with the refresh token. If successful, the new access token is 
 * stored in localStorage.
 * 
 * @returns {Promise<string|null>} The refreshed access token if successful, 
 * or null if the refresh token is missing, invalid, or the request fails.
 */
export const refreshAccessToken = async () => {
    const showDebugging = true;
    try {
        // Get the refresh token if it exists
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            debug(showDebugging, "Refresh token is missing", refreshToken);
            return null;
        }
        // Fetch a new access token
        debug(showDebugging, "Attempting to fetch a new access token", "");
        const response = await fetchAPI("/users/api/token/refresh/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const jsonResponse = await response.json();
        if (response.ok) {
            // Update access token (local storage)
            const accessToken = jsonResponse.access;
            const refreshToken = jsonResponse.refresh;
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            debug(
                showDebugging, 
                "Refreshed both the access and refresh token (local storage)", 
                ""
            );
            return jsonResponse.access;
        } else {
            debug(showDebugging, "Couldn't refresh access token", jsonResponse);
            return null;
        }
    } catch (error) {
        debug(showDebugging, "Error refreshing access token", error.message);
        return null;
    }
};

/**
 * Retrieves the access token from local storage or refreshes it if unavailable.
 * 
 * This function checks for an existing access token in local storage. If 
 * no access token is found, it attempts to refresh the token.
 * 
 * @returns {Promise<string|null>} The access token, either from local storage 
 * or refreshed, or null if no valid token is available.
 */
export const getAccessToken = async () => {
    const showDebugging = true;
    debug(showDebugging, "Getting the access token, if it exists.", "");
    let accessToken = localStorage.getItem("access_token");

    if (accessToken) {
        debug(showDebugging, "Found the access token (local storage).", accessToken);
        return accessToken;
    }else {
        debug(
            showDebugging, 
            "Couldn't find the access token (local storage), refreshing it now.", 
            accessToken
        );
        const refreshedAccessToken = await refreshAccessToken();
        if (refreshedAccessToken) {
            debug(showDebugging, "Refreshed access token.", refreshedAccessToken);
            return refreshedAccessToken;
        }
    }
    return null;
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
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};
