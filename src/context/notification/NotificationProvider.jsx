import { useState, useRef } from 'react';
import NotificationContext from './NotificationContext';
import { debug } from '@debug';

const NotificationProvider = ({ children }) => {
    const showDebugging = true;
    const [currentNotification, setCurrentNotification] = useState(null);
    const timeIdRef = useRef(null);

    /**
     * Handles the UX notifications.
     *
     * Sets the currentNotification and clears it after a
     * slight delay.
     *
     * Note that notifications can be overwritten! This system is simply
     * a UX design to signal the user about the current status of the app.
     * There is already an alert window that handles more detailed reports.
     *
     * @param {bool}  successful true when the action was successful,
     * false otherwise.
     * @param {str} message The notification message.
     * @returns {Promise<void>}
     * @throws Errors won't be fired by this function.
     */
    const addNotification = async (successful, message) => {
        try {
            setCurrentNotification({ successful, message });
            debug('d', showDebugging, 'Added a notification.', '');
            await new Promise((resolve) => {
                timeIdRef.current = setTimeout(() => {
                    setCurrentNotification(null);
                    resolve(true);
                }, 2000);
            });
        } catch (error) {
            debug('e', showDebugging, 'Failed to add a notification:', error);
            setCurrentNotification(null);
        }
    };

    return (
        <NotificationContext.Provider
            value={{ addNotification, currentNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
