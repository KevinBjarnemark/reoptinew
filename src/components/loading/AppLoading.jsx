import style from './AppLoading.module.css';
import LoadingSpinner from './loading-spinner/LoadingSpinner';


const AppLoading = () => {
    return (
        <div className={'flex-column-fixed ' + `${style.container}`}>
            <LoadingSpinner />
        </div>
    );
};

export default AppLoading;
