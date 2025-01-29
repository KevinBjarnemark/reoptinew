import { useRef, useState } from 'react';
import AppCloseButtonContext from './AppCloseButtonContext';

const AppCloseButtonProvider = ({ children }) => {
    const appCloseButtonOnClickRef = useRef(() => {});
    const [showAppCloseButton, setShowAppCloseButton] = useState(false);
    const [closeAppButtonTrigger, setCloseAppButtonTrigger] = useState(null);

    /**
     * Helps with toggling the `closeAppButtonTrigger` whenever the
     * app close button should be clicked.
     *
     * @returns {void}
     * @throws Errors must be handled by the caller
     */
    const appCloseButton = () => {
        setCloseAppButtonTrigger((prev) => (prev === null ? true : !prev));
    };

    const clearAppCloseButton = () => {
        setShowAppCloseButton(false);
    };

    return (
        <AppCloseButtonContext.Provider
            value={{
                appCloseButtonOnClickRef,
                showAppCloseButton,
                clearAppCloseButton,
                setShowAppCloseButton,
                appCloseButton,
                closeAppButtonTrigger,
            }}
        >
            {children}
        </AppCloseButtonContext.Provider>
    );
};

export default AppCloseButtonProvider;
