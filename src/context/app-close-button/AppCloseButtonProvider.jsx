import { useRef, useState } from 'react';
import AppCloseButtonContext from './AppCloseButtonContext';

const AppCloseButtonProvider = ({ children }) => {
    const appCloseButtonOnClickRef = useRef(() => {});
    const [showAppCloseButton, setShowAppCloseButton] = useState(false);

    return (
        <AppCloseButtonContext.Provider
            value={{
                appCloseButtonOnClickRef,
                showAppCloseButton,
                setShowAppCloseButton,
            }}
        >
            {children}
        </AppCloseButtonContext.Provider>
    );
};

export default AppCloseButtonProvider;
