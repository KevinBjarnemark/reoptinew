import { useContext } from 'react';
import style from './AppLoading.module.css';
import Logo from '../logo/Logo';
import AppLoadingContext from '@app-loading-context';

const AppLoading = () => {
    const { appLoading } = useContext(AppLoadingContext);
    return (
        <div className={'flex-column-fixed ' + `${style.container}`}>
            <Logo loading={appLoading} />
        </div>
    );
};

export default AppLoading;
