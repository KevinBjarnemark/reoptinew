import style from './BackgroundShadow.module.css';

const BackgroundShadow = ({ show }) => {
    if (show) {
        return (
            <div
                className={`flex-column-absolute ${style['background-shadow']}`}
            ></div>
        );
    }
};

export default BackgroundShadow;
