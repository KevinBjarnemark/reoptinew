import { useState, useEffect, useRef } from 'react';
import ScreenContext from './ScreenContext';
import { debug } from '@debug';

const ScreenProvider = ({ children }) => {
    const showDebugging = true;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const breakpoints = [480, 650, 1024]; // Key screen sizes
    const lastCheckpointRef = useRef(window.innerWidth);

    useEffect(() => {
        /**
         * Efficiently updates the screen width state.
         *
         * This function leverages a useRef to track the screen width
         * without causing unnecessary re-renders. The screenWidth state
         * only updates when crossing pre-defined screen sizes (breakpoints).
         *
         * @returns {void}
         */
        const handleResize = () => {
            const innerWidth = window.innerWidth;

            // Find the current breakpoint range
            let currentCheckpoint = 0;
            for (let i = breakpoints.length - 1; i >= 0; i--) {
                if (innerWidth > breakpoints[i]) {
                    currentCheckpoint = breakpoints[i];
                    break;
                }
            }

            // Update state if the checkpoint has changed
            if (currentCheckpoint !== lastCheckpointRef.current) {
                // Update the width
                setScreenWidth(innerWidth);
                // Update the last checkpoint
                lastCheckpointRef.current = currentCheckpoint;
                debug(showDebugging, 'Updated screen width', innerWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);

        // Ignoring breakpoints as a dependency as it won't change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ScreenContext.Provider value={{ screenWidth }}>
            {children}
        </ScreenContext.Provider>
    );
};

export default ScreenProvider;
