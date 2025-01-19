import { useContext } from 'react';
import AppCloseButtonContext from '@app-close-button-context';
import PageDimContext from '../../context/page-dim/PageDimContext';
/**
 * Brings the app back to a neutral state by getting rid of
 * components a scrolls to the top.
 *
 */
const useNeutralizeApp = (showDebugging = true) => {
    const { clearAppCloseButton } = useContext(AppCloseButtonContext);
    const { setDim } = useContext(PageDimContext);

    const neutralizeApp = () => {
        setDim(false);
        clearAppCloseButton();
        window.scrollTo(0, 0);
    };
    return { neutralizeApp };
};

export default useNeutralizeApp;
