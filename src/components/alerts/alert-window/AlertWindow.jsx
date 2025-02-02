import { useContext, useEffect, useState } from 'react';
import AlertContext from '@alert-context';
import style from './AlertWindow.module.css';

const AlertType = ({ messageIndex }) => {
    const { alerts } = useContext(AlertContext);
    return (
        <h5 style={{ opacity: alerts?.length > 0 ? 1 : 0 }}>
            <i
                className={`${alerts[messageIndex]?.icon}`}
                style={{ color: `${alerts[messageIndex]?.color}` }}
            ></i>
            {`${alerts[messageIndex]?.alertType}`}
        </h5>
    );
};

const ToggleButtons = (props) => {
    const { alerts } = useContext(AlertContext);
    const { messageIndex, setMessageIndex } = props;

    if (alerts?.length > 0) {
        return (
            <div
                className="flex-row-absolute"
                style={{ right: '50px', top: 0 }}
            >
                <p
                    className={
                        'flex-row-absolute' + ` ${style['toggle-alert-page']}`
                    }
                    style={{ color: '#ffffff' }}
                >
                    {`${messageIndex + 1}/${alerts.length}`}
                </p>
                <button
                    className={style.button}
                    onClick={() => {
                        setMessageIndex((prev) => Math.max(prev - 1, 0));
                    }}
                >
                    ◄
                </button>
                <button
                    className={style.button}
                    style={{ marginRight: '25px' }}
                    onClick={() => {
                        setMessageIndex((prev) =>
                            Math.min(prev + 1, alerts.length - 1),
                        );
                    }}
                >
                    ►
                </button>
            </div>
        );
    }
};

const TopBar = ({ messageIndex, setMessageIndex, ...restProps }) => {
    const { setTransformTranslate, clearAlerts } = useContext(AlertContext);

    const handleClose = () => {
        // Hide
        setTransformTranslate('translate(-110%, 0)');
        // Clear alerts
        clearAlerts();
        setMessageIndex(0);
    };

    return (
        <div className={`flex-row-relative ${style['top-bar']}`}>
            <AlertType {...{ messageIndex }} />
            <ToggleButtons
                {...{ messageIndex, setMessageIndex, ...restProps }}
            />

            <div className="flex-row-absolute" style={{ right: 0, top: 0 }}>
                <button
                    className={style['close-button']}
                    onClick={() => {
                        handleClose();
                    }}
                >
                    X
                </button>
            </div>
        </div>
    );
};

const AlertWindow = () => {
    const { alerts, transformTranslate, setTransformTranslate } =
        useContext(AlertContext);
    const [messageIndex, setMessageIndex] = useState(0);

    const [boxShadow, setBoxShadow] = useState('0 0 6px 4px #3d404194');
    const containerClassName = `flex-column-fixed ${style.container}`;

    useEffect(() => {
        if (alerts?.length > 0) {
            setTransformTranslate('translate(0, 0)');
        }

        // setTransformTranslate is in itself not a dependency,
        // but since it's imported from a context, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts]);

    useEffect(() => {
        let timeId;
        if (alerts?.length > 0) {
            setTransformTranslate('translate(0, 0)');
            setBoxShadow(`0 0 6px 4px ${alerts?.[messageIndex]?.color}`);

            timeId = setTimeout(() => {
                setBoxShadow('0 0 6px 4px #3d404194');
            }, 2000);
        }

        return () => {
            clearTimeout(timeId);
        };

        // setTransformTranslate is in itself not a dependency,
        // but since it's imported from a context, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts, messageIndex]);

    return (
        <section className="alert-window">
            {/* Simulate the existence of other cards */}
            {alerts?.length > 1 ? (
                <section
                    className={containerClassName}
                    style={{
                        transform:
                            `${transformTranslate}` +
                            'translate(3%, 8%) rotate(-7deg)',
                        boxShadow,
                        zIndex: 0,
                    }}
                >
                    <div className={`flex-row-relative ${style['top-bar']}`}>
                        Placeholder
                    </div>
                </section>
            ) : null}

            {/* Currently viewed alert card */}
            <section
                className={containerClassName}
                style={{ transform: transformTranslate, boxShadow }}
            >
                <TopBar {...{ messageIndex, setMessageIndex }} />

                <div className={`flex-row-relative w-100 ${style['content']}`}>
                    {alerts ? <p>{alerts[messageIndex]?.message}</p> : null}
                </div>
            </section>
        </section>
    );
};

export default AlertWindow;
