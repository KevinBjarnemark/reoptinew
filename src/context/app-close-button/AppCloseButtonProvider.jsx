import { useRef, useState } from 'react';
import AppCloseButtonContext from './AppCloseButtonContext';

const AppCloseButtonProvider = ({ children }) => {
    const appCloseButtonOnClickRef = useRef(() => {});
    const [showAppCloseButton, setShowAppCloseButton] = useState(false);

    /**
     * Clears the appCloseButtonOnClickRef and sets the
     * ShowAppCloseButton state to false.
     *
     * Use this function to clear the app close button.
     *
     * @returns {void}
     * @throws Errors must be handled by the caller
     */
    const clearAppCloseButton = () => {
        appCloseButtonOnClickRef.current = () => {};
        setShowAppCloseButton(false);
    };

    /**
     * Inserts a function into the appCloseButtonOnClickRef and
     * sets the setShowAppCloseButton to true.
     *
     * Use this function to control what happens when clicking the
     * app close button.
     *
     * @param {bool}  insertFunction The function you want to be stored
     * in the appCloseButtonOnClickRef.
     * @returns {void}
     * @throws Errors must be handled by the caller
     */
    const renderAppCloseButton = (insertFunction) => {
        appCloseButtonOnClickRef.current = insertFunction;
        setShowAppCloseButton(true);
    };

    return (
        <AppCloseButtonContext.Provider
            value={{
                appCloseButtonOnClickRef,
                showAppCloseButton,
                clearAppCloseButton,
                renderAppCloseButton,
                setShowAppCloseButton,
            }}
        >
            {children}
        </AppCloseButtonContext.Provider>
    );
};

export default AppCloseButtonProvider;
