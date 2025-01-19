import { useContext } from 'react';
import { debug } from '@debug';
import AlertContext from '../../context/alert-context/AlertContext';
import GeneralLoadingContext from '@general-loading-context';
import { fetchAPI } from '../../utils/fetch';
import { handleErrors } from '../../utils/errorHandling';

/**
 * Converts a normal object into FormData.
 *
 * This function can be used to enable support for file uploads,
 * binary data, and Blob objects.
 *
 * @param {object} normalObject Any fields that are relevant for
 * the backend.
 * @returns {FormData}
 * @throws Errors must be handled by the caller
 */
const buildFormData = (showDebugging, normalObject) => {
    const formData = new FormData();
    Object.entries(normalObject).forEach(([key, value]) => {
        if (value !== null) {
            debug(showDebugging, `Appending form data (${key})`, value);
            formData.append(key, value);
        }
    });

    return formData;
};

/**
 * A local helper function that builds a headers object based on the
 * authorizationHeader and formDataDraft.
 *
 * Note, if formDataDraft if falsy, a JSON body is assumed.
 *
 * @param {bool} authorizationHeader Adds the access token from local
 * storage as an authorization header, if true.
 * @param {null|FormData} formData Adds a content type header as JSON if
 * falsy.
 * @returns {object}
 * @throws Errors must be handled by the caller
 */
const buildHeaders = (authorizationHeader, formDataDraft) => {
    let headers = {};
    // If the authorizationHeader is true, add the access token
    if (authorizationHeader) {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }
    }

    // If there's no form data, assume the content type is JSON
    if (!formDataDraft) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
};

/**
 * A custom hook for managing form submissions with robust error handling,
 * debugging, and API communication.
 *
 * This hook simplifies the process of submitting form data to the backend
 * API by centralizing validation, debugging, and error reporting. It
 * ensures a clean and consistent interface for handling form submission
 * logic, improving maintainability and user experience across the application.
 *
 * Key Features:
 * - Validates form data before submission, leveraging custom validation
 * logic (validateForm).
 * - Converts draft form data into FormData for flexible backend compatibility.
 * - Sends POST requests to the specified backend endpoint (`relativeURL`).
 * - Handles errors gracefully, distinguishing between frontend validation
 * errors and backend responses.
 * - Supports customizable debugging messages for streamlined development and
 * troubleshooting.
 * - Displays user-friendly alerts for both expected and unexpected errors.
 *
 * @param {boolean} showDebugging - Enables or disables debugging logs. Default
 * is true.
 */
const useAPI = (showDebugging = true) => {
    const { addAlert } = useContext(AlertContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );

    /**
     * Handles fetch requests by validating data (if any), sending requests
     * to the backend, and managing responses.
     *
     * If you include form data (formDataDraft), this function validates it
     * and converts it into FormData.
     *
     * It also handles errors at both the frontend (validation)
     * and backend (API response) levels, ensuring debugging logs and
     * user-friendly alerts are generated as needed.
     *
     * Note, that formDataDraft fields containing the value null, will be
     * skipped.
     *
     * @param {object} data An object containing submission configuration and
     * form data.
     * @param {function} data.validateForm A function to validate form fields.
     * Should throw errors for invalid fields.
     * @param {null|object} data.formDataDraft An object representing the draft
     * form data to be submitted. Note, only use this if data.body is empty.
     * @param {null|object} data.body An object that shoudld be sent with the
     * request. Note, only use this is data.formDataDraft is null. (Will be
     * stringified).
     * @param {string} data.relativeURL The relative URL for the backend
     * endpoint where the form data should be sent.
     * @param {bool} data.authorizationHeader Set this to true if you can to
     * include the authorization header (with access token) in the request.
     * @param {string} data.method The method of the request, defaults to
     * "POST".
     * @param {object} [data.debugMessages] Messages for debugging.
     * @param {string} [data.debugMessages.backendError] Message to log when
     * errors are thrown in the backend.
     * @param {string} [data.debugMessages.frontendError] Message to log when
     * errors are thrown in the frontend.
     * @param {string} [data.debugMessages.successfulBackEndResponse] Message
     * to log when the back end response was successful.
     * @returns {object|null} Returns the successful backend response object on
     * success, or `null` if validation or backend submission fails.
     * @throws Handles errors gracefully. Both front and backend errors are
     * debugged and displayed in a user-fiendly way.
     */
    const apiRequest = async (data) => {
        const {
            validateForm = null,
            formDataDraft = null,
            body = null,
            relativeURL,
            debugMessages = {},
            authorizationHeader = false,
            method = 'POST',
        } = data;

        addLoadingPoint();
        try {
            // Validate form before sending to the backend
            if (validateForm) {
                validateForm(); // Should throw custom errors
            } else {
                debug(
                    showDebugging,
                    'No validate form function included, ' +
                        'skipping frontend validation',
                    '',
                );
            }
        } catch (error) {
            const errorMessage =
                error.message || 'Validation failed. Please try again.';
            debug(showDebugging, 'Frontend validation failed', errorMessage);
            addAlert(errorMessage, 'Error');
            return;
        } finally {
            removeLoadingPoint();
        }
        // Handle submission
        addLoadingPoint();
        try {
            let formData = null;
            // Object to be sent with the request
            const fetchObject = {
                method,
            };

            // Convert form data draft into FormData
            if (formDataDraft) {
                formData = buildFormData(showDebugging, formDataDraft);
            }

            // Build headers
            const updatedHeaders = buildHeaders(
                authorizationHeader,
                formDataDraft,
            );
            // Add updated headers
            fetchObject.headers = {
                Accept: 'application/json',
                ...updatedHeaders,
            };

            // Add formdata or body (if present)
            if (formDataDraft) {
                fetchObject.body = formData;
            } else if (body) {
                fetchObject.body = JSON.stringify(body);
            } else {
                debug(
                    showDebugging,
                    'No form data or body detected',
                    fetchObject,
                );
            }

            debug(showDebugging, 'Executing an API request', fetchObject);
            // Execute the request
            const response = await fetchAPI(relativeURL, fetchObject);

            const jsonResponse = await response.json();
            const debugData = {
                showDebugging,
                message: debugMessages?.backendError,
            };
            if (handleErrors(response, jsonResponse, addAlert, debugData)) {
                debug(
                    showDebugging,
                    debugMessages?.successfulBackEndResponse,
                    jsonResponse,
                );
                return jsonResponse; // Return successful response
            }
        } catch (error) {
            debug(showDebugging, 'Unexpected error (frontend)', error);
            addAlert(debugMessages?.frontendError, 'Error');
        } finally {
            removeLoadingPoint();
        }

        return null; // Indicate failure
    };

    return { apiRequest };
};

export default useAPI;
