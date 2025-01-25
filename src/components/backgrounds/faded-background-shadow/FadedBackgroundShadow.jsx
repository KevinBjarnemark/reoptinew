import style from './FadedBackgroundShadow.module.css';

const FadedBackgroundShadow = ({ show }) => {
    if (show) {
        return (
            <div
                className={`flex-column-absolute ${style['background-shadow']}`}
            ></div>
        );
    }
};

export default FadedBackgroundShadow;
