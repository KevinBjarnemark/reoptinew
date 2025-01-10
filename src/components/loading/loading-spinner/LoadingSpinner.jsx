import style from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
    return (
        <div
            className={'flex-column-relative ' + `${style['logo-container']}`}
        >
            <div className="flex-column-relative">
                <div
                    className={
                        'flex-column-relative ' + `${style['outer-circle']}`
                    }
                >
                    <div
                        className={
                            'flex-column-absolute ' +
                            `${style['inner-circle']}`
                        }
                    ></div>
                </div>
            </div>
            <div
                className={`flex-column-absolute ${style['bottom-bar']}`}
            ></div>
            <div
                className={`flex-column-absolute ${style['tilted-bar']}`}
            ></div>

            <p className={style['brand-name']}>eoptinew</p>

            <div
                className={`flex-column-absolute ${style['loading-text-container']}`}
            >
                <p className={style['loading-text']}>Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
