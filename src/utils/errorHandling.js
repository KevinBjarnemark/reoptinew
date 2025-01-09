import { debug } from './log';

/**
 * Creates a structured error object to streamline backend error handling.
 * Should be called after an unsuccessful API request.
 * 
 * @param {bool}  response The initial request
 * @param {str}   jsonResponse The awaited JSON response from the API.
 * @returns {any} A structured error object containing status details
 * and API error information.
 * 
 */
export const backendError = (response, jsonResponse) => {
    return {
        status: response?.status,
        statusText: response?.statusText,
        errorMessage: jsonResponse?.error_message,
        errorDetails: jsonResponse?.error_details,
    }
};

/**
 * Formats the backend Python error identifier into a readable 
 * format, unless the error identifier is equal to non_field_errors. 
 * In that case it returns an empty string.
 * 
 * This is a helper function for displaying the backend custom 
 * errors in a convenient way. Specifically, it converts a 
 * snake_case string into a normal sentence with spaces,
 * capitalizing the first letter.
 * 
 * @param {str}   text
 * @returns {any} Empty string if the text is equal to 
 * non_field_errors, otherwise the text with a capitalized 
 * first letter. 
 */
export const formatErrorIdentifier = (text = "") => {
    return text.split("_").map((word, index) => 
        index === 0 
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word
        ).join(" ");
};

/**
 * Check if the inputed value is an object.
 * 
 */
const isObject = (value, requireContent = false) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false; // Not an object
    }

    return requireContent ? Object.keys(value).length > 0 : true;
};


/**
 * 
 * 
 * @throws Errors for this function must be handled by the caller.
 */
export const handleErrors = (response, jsonResponse, addAlert, debugData) => {
    if (!response.ok) {
        debug(
            debugData.showDebugging, 
            debugData.message, 
            backendError(response, jsonResponse),
        );
        // Add multiple alerts, referencing the error list for each field
        const errorDetails = jsonResponse?.error_details;
        if (isObject(errorDetails, true)) {
            Object.entries(errorDetails).forEach(([field, value]) => {
                value.forEach(errorMessage => {
                    addAlert(
                        `${formatErrorIdentifier(field) + ":"} ${errorMessage}`, "Server Error"
                    );
                });
            });
        } else {
            // Default to the generic message
            addAlert(jsonResponse?.error_message || "An unexpected error occurred.", "Server Error");
            debug(
                true, 
                "UNEXPECTED! A backend error was detected, but there were no error " +
                "messages available", 
                jsonResponse
            );
        }
        return false; // Backend errors were detected
    }
    return true; // Backend is "error-free"
};
