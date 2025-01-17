import { debug } from '@debug';
import { NON_FIELD_ERRORS_STRING } from './constants';
import { isObject } from './helpers';

/**
 * Creates a structured error object to streamline backend error handling.
 * Should be called after an unsuccessful API request.
 *
 * @param {bool}  response The initial request
 * @param {str}   jsonResponse The awaited JSON response from the API.
 * @returns {void} A structured error object containing status details
 * and API error information.
 *
 */
export const backendError = (response, jsonResponse) => {
    return {
        status: response?.status,
        statusText: response?.statusText,
        errorMessage: jsonResponse?.error_message,
        errorDetails: jsonResponse?.error_details,
    };
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
 * @param {string}   text
 * @returns {string} Empty string if the text is equal to
 * non_field_errors, otherwise the text with a capitalized
 * first letter.
 */
export const formatErrorIdentifier = (text = '') => {
    const snakeCaseToNormal = text
        .split('_')
        .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
        )
        .join(' ');
    if (text.trim() !== NON_FIELD_ERRORS_STRING + ':') {
        return snakeCaseToNormal;
    } else {
        return snakeCaseToNormal.split(':')[1];
    }
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
                value.forEach((errorMessage) => {
                    addAlert(
                        `${formatErrorIdentifier(field + ': ')}` +
                            `${errorMessage}`,
                        'Server Error',
                    );
                });
            });
        } else {
            // Default to the generic message
            addAlert(
                jsonResponse?.error_message || 'An unexpected error occurred.',
                'Server Error',
            );
            debug(
                true,
                'UNEXPECTED! A backend error was detected, but there ' +
                    'were no error messages available',
                jsonResponse,
            );
        }
        return false; // Backend errors were detected
    }
    return true; // Backend is "error-free"
};
