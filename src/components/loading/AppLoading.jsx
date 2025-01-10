import {useContext} from 'react';
import style from './AppLoading.module.css';
import Logo from '../logo/Logo';
import LoadingContext from '../../context/LoadingContext';


const AppLoading = () => {
    const { appLoading } = useContext(LoadingContext);
    return (
        <div className={'flex-column-fixed ' + `${style.container}`}>
            <Logo loading={appLoading}/>
        </div>
    );
};

export default AppLoading;
