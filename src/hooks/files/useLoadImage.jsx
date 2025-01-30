import { useContext } from 'react';
// Contexts
import AlertContext from '@alert-context';
import GeneralLoadingContext from '@general-loading-context';
// Functions
import { createFileURL } from '@helpers';
// Logging
import { debug } from '@debug';

const useLoadImage = (showDebugging) => {
    // Contexts
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    // Custom hooks
    const { addAlert } = useContext(AlertContext);

    /**
     * Returns an image with user-friendly error handling and debugging.
     *
     * @param {object} e
     * @returns {object|null} Returns null if no image found, other wise
     * the file and the file url.
     * @throws Errors are handled and displayed in a user-friendly way.
     */
    const loadImage = (e) => {
        addLoadingPoint();
        try {
            const file = e.target.files[0];
            if (file) {
                const url = createFileURL(file);
                debug('d', showDebugging, 'Image loaded', '');
                return { file, url };
            }
            return null;
        } catch (error) {
            addAlert(
                'Something went wrong when loading a custom image, ' +
                    'try refreshing your browser.',
                'Error',
            );
            debug(
                'e',
                showDebugging,
                'Error when attempting to load a custom post image.',
                error,
            );
            return null;
        } finally {
            removeLoadingPoint();
        }
    };

    return { loadImage };
};

export default useLoadImage;
