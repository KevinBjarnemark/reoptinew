import { useContext } from 'react';
import style from './AppCloseButton.module.css';
import AppCloseButtonContext from '../../../context/app-close-button/AppCloseButtonContext';

const AppCloseButton = () => {
    const { showAppCloseButton, appCloseButtonOnClickRef } = useContext(
        AppCloseButtonContext,
    );

    if (showAppCloseButton) {
        return (
            <button
                className={`flex-column-fixed ${style['button']}`}
                onClick={appCloseButtonOnClickRef.current}
            >
                <p className="flex-column-fixed">X</p>
            </button>
        );
    }
};

export default AppCloseButton;
