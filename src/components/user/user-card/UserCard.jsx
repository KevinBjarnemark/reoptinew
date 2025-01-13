import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import { getRefreshToken, clearAuthTokens } from '@authentication/accessToken';
import { debug } from '@debug';
import style from './UserCard.module.css';
import useSubmit from '../../../hooks/forms/useSubmit';
import AlertContext from '../../../context/alert-context/AlertContext';

export const UserCard = () => {
    const showDebugging = true;
    const { profile, isAuthenticated, setIsAuthenticated } =
        useContext(UserContext);
    const { addAlert } = useContext(AlertContext);
    const { submitData } = useSubmit(showDebugging);

    /**
     * Uses the onSubmit hook to submit the logout data to the
     * backend.
     */
    const handlelogOut = async () => {
        // Get the refresh token if it exists
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            debug(showDebugging, 'Refresh token is missing', refreshToken);
            addAlert(
                'Unexpected error, when trying to log you ' +
                    'out. Try refreshing the browser.',
                'Error',
            );
            return null;
        }

        const response = await submitData({
            relativeURL: '/users/logout/',
            fetchObject: {
                method: 'POST',
                headers: {
                    // eslint-disable-next-line max-len
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            },
            debugMessages: {
                backendError: 'Log out failed (backend)',
                frontendError: 'Log out failed (frontend)',
                successfulBackEndResponse: 'Log out successful',
            },
        });
        if (response) {
            debug(showDebugging, 'Logout successful', response);
            clearAuthTokens();
            debug(showDebugging, 'Removed auth tokens from local storage', '');
            setIsAuthenticated(false);
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <button
                    className={`flex-column-fixed ${style['log-out-button']}`}
                    onClick={() => {
                        handlelogOut();
                    }}
                >
                    Log out
                </button>
            ) : null}

            <section className={`flex-column-fixed ${style.container}`}>
                <div className={`flex-row-relative ${style['top-bar']}`}>
                    <div
                        className={style['auth-status-indicator']}
                        style={{
                            backgroundColor: isAuthenticated
                                ? '#7dff7f'
                                : '#fc5555',
                        }}
                    ></div>
                    {isAuthenticated
                        ? 'Logged in as a ' +
                          `${profile?.username ? profile?.username : ''}`
                        : 'Viewing as a guest'}
                </div>
            </section>
        </>
    );
};
