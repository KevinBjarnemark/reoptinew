import style from './PopUp.module.css';
import BasicButton from '@basic-button';

const PopUp = ({ children, title, show, handleClose }) => {
    if (show) {
        return (
            <>
                <section
                    className={'flex-column-fixed ' + `${style.background}`}
                ></section>

                <section
                    className={'flex-column-fixed ' + `${style.container}`}
                >
                    <div
                        className={
                            'flex-column-relative ' +
                            `${style['inner-container']}`
                        }
                    >
                        {title ? (
                            <h3 className={style.title}>{title}</h3>
                        ) : null}
                        <BasicButton
                            text={'X'}
                            buttonProps={{
                                onClick: handleClose,
                                className:
                                    'flex-column-fixed ' +
                                    `${style['close-button']}`,
                            }}
                        />
                        {children}
                    </div>
                </section>
            </>
        );
    }
};

export default PopUp;
