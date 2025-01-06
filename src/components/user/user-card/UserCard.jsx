import { useContext } from 'react';
import UserContext from '../../../context/UserContext'; 
import { getRefreshToken, clearAuthTokens } from '../../../functions/authentication/accessToken'; 
import { debug } from '../../../utils/log'; 
import { backendError } from '../../../utils/errorHandling';
import { fetchAPI } from '../../../utils/fetch';
import style from './UserCard.module.css';

export const UserCard = () => {
    const {profile, isAuthenticated, setIsAuthenticated} = useContext(UserContext);

    const handlelogOut = async () => {
        const showDebugging = true;
        try {
            // Get the refresh token if it exists
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                debug(showDebugging, "Refresh token is missing", refreshToken);
                return null;
            }

            debug(showDebugging, "Refresh token found: ", refreshToken);
            const response = await fetchAPI("/users/logout/", {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            const jsonResponse = await response.json();
            if (response.ok) {
                debug(showDebugging, "Logout successful", jsonResponse);
                clearAuthTokens();
                debug(showDebugging, "Removed auth tokens from local storage", "");
                setIsAuthenticated(false);
                return;
            }else {
                debug(
                    showDebugging, 
                    "Logout failed (backend)", 
                    backendError(response, jsonResponse)
                );
                return;
                // TODO --> Display backend error alert
            }
        } catch (error) {
            debug(showDebugging, "Logout failed (frontend)", error);
        }
    };

    return (
        <>
            {isAuthenticated ?
                <button 
                    className={`flex-column-fixed ${style["log-out-button"]}`}
                    onClick={() => {handlelogOut()}}
                >
                    Log out
                </button>
            : null}
            
            <section className={`flex-column-fixed ${style.container}`}>
                <div className={`flex-row-relative ${style["top-bar"]}`}>
                    <div 
                        className={style["auth-status-indicator"]}
                        style={{
                            backgroundColor: 
                                isAuthenticated ? "#7dff7f" : "#fc5555"
                        }}
                    >
                    </div>
                    {isAuthenticated ? 
                    `Logged in as a ${profile?.username ? profile?.username : ""}` : 
                    "Viewing as a guest"}
                </div>
            </section>
        </>

    );
}

