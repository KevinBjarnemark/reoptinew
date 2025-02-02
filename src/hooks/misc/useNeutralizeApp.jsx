import { useContext } from 'react';
import AppCloseButtonContext from '@app-close-button-context';
import PageDimContext from '@page-dim-context';
/**
 * Brings the app back to a neutral state by getting rid of
 * components a scrolls to the top.
 *
 */
const useNeutralizeApp = () => {
    const { clearAppCloseButton } = useContext(AppCloseButtonContext);
    const { setDim } = useContext(PageDimContext);

    const neutralizeApp = (scrollToTop = true) => {
        setDim(false);
        clearAppCloseButton();
        if (scrollToTop) {
            window.scrollTo(0, 0);
        }
    };
    return { neutralizeApp };
};

export default useNeutralizeApp;
