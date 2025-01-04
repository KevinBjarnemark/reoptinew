import {debug} from '../../utils/log';
import { jwtDecode } from "jwt-decode";
        
export const refreshAccessToken = async () => {
    const showDebugging = true;
    try {
        // Get the refresh token if it exists
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            debug(showDebugging, "Refresh token is missing", refreshToken);
            return null;
        }
        // Fetch a new access token
        debug(showDebugging, "Attempting to fetch a new access token", "");
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/users/api/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const jsonResponse = await response.json();
        if (response.ok) {
            // Update access token (local storage)
            const accessToken = jsonResponse.access;
            localStorage.setItem("access_token", accessToken);
            debug(showDebugging, "Refreshed access token (local storage)", accessToken);
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

export const getUserIdFromToken = () => {
    const showDebugging = true;

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
        debug(showDebugging, "Access token is missing", accessToken);
        return null;
    }
    try {
        const decodedToken = jwtDecode(accessToken);
        debug(showDebugging, "Decoded token", accessToken);
        return decodedToken.user_id;
    } catch (error) {
        debug(showDebugging, "Failed to decode token", error.message);
        return null;
    }
};

