import { createContext, useState, useEffect } from 'react';
import { getAccessToken, refreshAccessToken } from '../functions/authentication/accessToken';
import { backendError } from '../utils/errorHandling';
import { debug } from '../utils/log';


export const UserContext = createContext()
 
export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    
    const loadProfile = async () => {
        const showDebugging = true; 
        setLoadingProfile(true);
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                debug(true, "No valid access token available.", "");
                return;
            }

            debug(showDebugging, "Getting the user profile", "");
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/users/profile/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            const jsonResponse = await response.json();
            if (response.ok) {
                debug(showDebugging, "Fetched user profile", jsonResponse);
                setProfile(jsonResponse);
            }else {
                debug(
                    showDebugging, 
                    "Failed fetching user profile (backend)", 
                    backendError(response, jsonResponse)
                );
                // TODO --> Backend error alert
                return null;
            }
        } catch (error) {
            debug(showDebugging, "Error fetching user profile (frontend)", error.message);
            // TODO --> Frontend error alert
        } finally {
            setLoadingProfile(false);
        }
    };

    const initRefreshAccessToken = async () => {
        await refreshAccessToken();
    };

    useEffect(() => {
        // Load profile
        if (profile === null && !loadingProfile) {
            loadProfile();
        }

        // Refresh the access token before expiration
        const timeId = setInterval(() => {
            initRefreshAccessToken();
        }, 14 * 60 * 1000); // Refresh every 14 minutes

        return () => {
            clearInterval(timeId);
        };
    }, [profile]);

    return(
      <UserContext.Provider value={{ profile, loadProfile, loadingProfile }}>
        {children}
      </UserContext.Provider>
  );
}; 
