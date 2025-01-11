import { useContext } from 'react';
import GeneralLoadingContext from '@general-loading-context';
import { debug } from '../../utils/log';

const useSimulateLoading = (showDebugging = true) => {
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );

    /**
     * Use this function to simulate loading for a brief moment.
     * The short loading animation is supposed to signal to the user
     * that the system has rekognized their action.
     *
     * Example usecases:
     *
     * - When an action is likely to finish quickly, causing a flickering
     * loading effect.
     *
     * - To throttle expensive API requests on the client side.
     *
     * - To give an immediate system response when a button is clicked.
     *
     * @returns {Promise<void>}
     * @throws Errors can be handled by the caller.
     */

    const simulateLoading = async () => {
        addLoadingPoint();
        try {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1400);
            });
        } catch (error) {
            debug(
                showDebugging,
                'Failed to simulate the loading effect',
                error,
            );
            // This doesn't need a user alert
        } finally {
            removeLoadingPoint();
        }
    };

    return { simulateLoading };
};

export default useSimulateLoading;
