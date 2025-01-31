import { useState } from 'react';
import AlertContext from './AlertContext';

const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    // Control the transform animation
    const [transformTranslate, setTransformTranslate] = useState('');

    const addAlert = (message, alertType) => {
        let faClass = '';
        let faColor = '';

        switch (alertType) {
            default: {
                faClass = 'fa-solid fa-circle-info';
                faColor = 'var(--color-info)';
                break;
            }
            case 'Info': {
                faClass = 'fa-solid fa-circle-info';
                faColor = 'var(--color-info)';
                break;
            }
            case 'Error': {
                faClass = 'fa-solid fa-xmark';
                faColor = 'var(--color-error)';
                break;
            }
            case 'Server Error': {
                faClass = 'fa-solid fa-xmark';
                faColor = 'var(--color-error)';
                break;
            }
            case 'Done': {
                faClass = 'fa-solid fa-check';
                faColor = 'var(--color-success)';
                break;
            }
            case 'Warning': {
                faClass = 'fa-solid fa-triangle-exclamation';
                faColor = 'var(--color-warning)';
                break;
            }
        }
        setAlerts((prev) => [
            ...prev,
            {
                id: Date.now(),
                alertType,
                message,
                icon: faClass,
                color: faColor,
            },
        ]);
    };

    const clearAlerts = () => {
        setAlerts([]);
    };

    return (
        <AlertContext.Provider
            value={{
                alerts,
                addAlert,
                clearAlerts,
                transformTranslate,
                setTransformTranslate,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export default AlertProvider;
