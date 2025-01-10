import style from './Logo.module.css';

const Logo = ({ loading = false }) => {
    const animationCSS = {
        'outer-circle': loading ? style['outer-circle-animation'] : '',
        'loading-text-container-animation': loading
            ? style['loading-text-container-animation']
            : '',
        'tilted-bar-animation': loading ? style['tilted-bar-animation'] : '',
        "brand-name-animation": loading ? style['brand-name-animation'] : '',
    };

    return (
        <div
            className={'flex-column-relative ' + `${style['logo-container']}`}
        >
            <div className="flex-column-relative">
                <div
                    className={
                        'flex-column-relative ' +
                        `${style['outer-circle']} ` +
                        `${animationCSS['outer-circle']}`
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
                className={
                    `flex-column-absolute ${style['tilted-bar']} ` +
                    `${animationCSS['tilted-bar-animation']}`
                }
            ></div>

            <p
                className={
                    `${style['brand-name']} ` +
                    `${animationCSS['brand-name-animation']}`
                }
            >
                {loading ? 'Loading...' : 'eoptinew'}
            </p>
        </div>
    );
};

export default Logo;
