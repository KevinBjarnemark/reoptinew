import { useState, useEffect } from 'react';
import { getAccessToken, refreshAccessToken } from '../functions/authentication/accessToken';
import { backendError } from '../utils/errorHandling';
import { debug } from '../utils/log';
import { fetchAPI } from '../utils/fetch';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    // This is null when the user is loading
    const [isAuthenticated, setIsAuthenticated] = useState(null);
        
    /**
     * Loads the user's profile and updates authentication state.
     * 
     * This function attempts to retrieve the authenticated user's profile 
     * from the backend. It first ensures that a valid access token is available. 
     * If no valid token is found, the user is marked as unauthenticated. 
     * If the profile fetch is successful, the user's profile is stored in state 
     * and the user is marked as authenticated.
     * 
     * @returns {Promise<void>} Resolves after updating the profile and 
     * authentication state.
     */
    const loadProfile = async () => {
        const showDebugging = true; 
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                debug(true, "No valid access token available.", "");
                setIsAuthenticated(false);
                return;
            }

            debug(showDebugging, "Fetching the user profile", "");
            const response = await fetchAPI("/users/profile/", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            const jsonResponse = await response.json();
            if (response.ok) {
                debug(showDebugging, "Fetched user profile", jsonResponse);
                setProfile(jsonResponse);
                setIsAuthenticated(true);
            }else {
                debug(
                    showDebugging, 
                    "Failed fetching user profile (backend)", 
                    backendError(response, jsonResponse)
                );
                
                setIsAuthenticated(false);
                // TODO --> Backend error alert
                return;
            }
        } catch (error) {
            debug(showDebugging, "Error fetching user profile (frontend)", error.message);
            setIsAuthenticated(false);
            // TODO --> Frontend error alert
        }
    };

    const initRefreshAccessToken = async () => {
        await refreshAccessToken();
    };

    useEffect(() => {
        // Load profile
        if (isAuthenticated !== false) {
            loadProfile();
        }

        // Refresh the access token before expiration
        const timeId = setInterval(() => {
            if (isAuthenticated) {
                debug(true, "Refreshing the access token before expiring.", "");
                initRefreshAccessToken();
            }
        }, 14 * 60 * 1000); // Refresh every 14 minutes

        return () => {
            clearInterval(timeId);
        };
    }, [isAuthenticated]);

    return(
      <UserContext.Provider value={{ profile, isAuthenticated, setIsAuthenticated }}>
        {children}
      </UserContext.Provider>
  );
}; 

export default UserProvider;
