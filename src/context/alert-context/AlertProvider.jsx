import { useState } from 'react';
import AlertContext from './AlertContext';

const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);
    
    // Control the transform animation
    const [transformTranslate, setTransformTranslate] = useState("");

    const addAlert = (message, alertType) => {
        let faClass = ""
        let faColor = ""

        switch(alertType){
            default: {
                faClass = "fa-solid fa-circle-info";
                faColor = "var(--color-info)";
                break;
            }
            case "Info": {
                faClass = "fa-solid fa-circle-info";
                faColor = "var(--color-info)";
                break;
            }
            case "Error": {
                faClass = "fa-solid fa-xmark";
                faColor = "var(--color-error)";
                break;
            }
            case "Server Error": {
                faClass = "fa-solid fa-xmark";
                faColor = "var(--color-error)";
                break;
            }
            case "Done": {
                faClass = "fa-solid fa-check";
                faColor = "var(--color-success)";
                break;
            }
        }
        setAlerts((prev) => 
            [
                ...prev, 
                { 
                    id: Date.now(), 
                    alertType,
                    message, 
                    icon: faClass, 
                    color: faColor,
                }
            ]
        );
    };

    const clearAlerts = () => {
        setAlerts([]);
    };

    /**
     * Formats the backend Python error code into a readable 
     * format, unless the error code is equal to non_field_errors. 
     * In that case it returns an empty string.
     * 
     * This is a helper function for displaying the backend custom 
     * errors in a convenient way.  
     * 
     * @param {str}   text
     * @returns {any} Empty string if the text is equal to 
     * non_field_errors, otherwise the text with a capitalized 
     * first letter. 
     */
    const formatErrorCode = (text) => {
        if (text !== "non_field_errors") {
            return text.charAt(0).toUpperCase() + text.slice(1) + ":";
        }
        return "";
    };

    return(
        <AlertContext.Provider 
            value={
                { 
                    alerts, addAlert, clearAlerts, transformTranslate, 
                    setTransformTranslate, formatErrorCode 
                }
            }
        >
        {children}
      </AlertContext.Provider>
  );
}; 

export default AlertProvider;
