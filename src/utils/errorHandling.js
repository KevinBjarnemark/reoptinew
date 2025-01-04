
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
