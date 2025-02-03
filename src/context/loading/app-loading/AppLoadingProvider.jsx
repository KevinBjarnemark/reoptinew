import { useState, useEffect, useContext } from 'react';
import { debug } from '@debug';
import UserContext from '@user-context';
import AppLoadingContext from './AppLoadingContext';

const AppLoadingProvider = ({ children }) => {
    // Config
    const showDebugging = true;
    // States
    const [appLoading, setAppLoading] = useState(true);
    // Contexts
    const { isAuthenticated } = useContext(UserContext);

    /**
     * This useEffect is used to determine when the app has finished
     * loading.
     *
     * Brand awareness strategy:
     *
     * To avoid a flickering loading screen and increase brand awareness,
     * an extra 3 seconds loading time has been integrated. The app loading
     * screen is in itself an animation designed for brand rekognition. This
     * animation is shown when the appLoading state is false.
     */
    useEffect(() => {
        let timeId;
        if (isAuthenticated !== null) {
            timeId = setTimeout(() => {
                setAppLoading(false);
            }, 3000);
            debug(
                'd',
                showDebugging,
                'App loading done! Should exit loading screen in 3 seconds.',
                '',
            );
        }

        return () => {
            clearTimeout(timeId);
        };

        // showDebugging is excluded as it doesn't change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <AppLoadingContext.Provider value={{ appLoading }}>
            {children}
        </AppLoadingContext.Provider>
    );
};

export default AppLoadingProvider;
