import { useContext } from 'react';
import { debug } from '../../utils/log';
import AlertContext from '../../context/alert-context/AlertContext';
import { fetchAPI } from '../../utils/fetch';
import { handleErrors } from '../../utils/errorHandling';

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
const useSubmit = (showDebugging = true) => {
    const { addAlert } = useContext(AlertContext);

    /**
     * Handles form submission by validating data, sending it to the backend,
     * and managing responses.
     *
     * This function validates the provided form data (formDataDraft),
     * converts it into FormData, and sends a POST request to the specified
     * relativeURL. It also handles errors at both the frontend (validation)
     * and backend (API response) levels, ensuring debugging logs and
     * user-friendly alerts are generated as needed.
     *
     * Note, that formDataDraft fields containing the value null, will be
     * skipped.
     *
     * @param {Object} data An object containing submission configuration and
     * form data.
     * @param {Function} data.validateForm A function to validate form fields.
     * Should throw errors for invalid fields.
     * @param {Object} data.formDataDraft An object representing the draft form
     * data to be submitted.
     * @param {string} data.relativeURL The relative URL for the backend
     * endpoint where the form data should be sent.
     * @param {Object} [data.debugMessages] Messages for debugging.
     * @param {string} [data.debugMessages.backendError] Message to log when
     * errors are thrown in the backend.
     * @param {string} [data.debugMessages.frontendError] Message to log when
     * errors are thrown in the frontend.
     * @param {string} [data.debugMessages.successfulBackEndResponse] Message
     * to log when the back end response was successful.
     * @returns {Object|null} Returns the successful backend response object on
     * success, or `null` if validation or backend submission fails.
     *
     * Example Usage:
     *
     * const response = await submitForm({
     *     validateForm: () => {
     *         if (!formDataDraft.username) {
     *              throw new Error("Username is required.")
     *          }
     *         if (formDataDraft.password.length < 8) {
     *              throw new Error("Password too short.")
     *          }
     *     },
     *     formDataDraft:
     *          {
     *          username: "exampleUser",
     *          password: "securePassword"
     *          },
     *     relativeURL: "/api/login/",
     *     debugMessages: {
     *         backendError: "Login failed (server-side error).",
     *         frontendError: "Login failed (validation error).",
     *         successfulBackEndResponse: "Login successful!",
     *     },
     * });
     *
     * // Note, errors are already handled at this point!
     * if (response) {
     *     console.log("Success:", response);
     * }
     */
    const submitForm = async (data) => {
        const {
            validateForm,
            formDataDraft,
            relativeURL,
            debugMessages = {},
        } = data;

        // Validate form before sending to the backend
        try {
            validateForm(); // Should throw custom errors
        } catch (error) {
            /* 
                TODO! (UX PROBLEM)
                If validateForm throws an unexpected error it 
                will be displayed to the client! 
            */
            const errorMessage =
                error.message || 'Validation failed. Please try again.';
            debug(showDebugging, 'Frontend validation failed', errorMessage);
            addAlert(errorMessage, 'Error');
            return;
        }
        // Handle submission
        try {
            // Convert form data draft into FormData
            const formData = new FormData();
            Object.entries(formDataDraft).forEach(([key, value]) => {
                if (value !== null) {
                    debug(
                        showDebugging,
                        `Appending form data (${key})`,
                        value,
                    );
                    formData.append(key, value);
                }
            });

            // Send form data to backend
            const response = await fetchAPI(relativeURL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

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
            debug(showDebugging, debugMessages?.frontendError, error);
            addAlert('Unexpected error.', 'Error');
        }

        return null; // Indicate failure
    };

    const submitData = async (data) => {
        const { relativeURL, debugMessages = {}, fetchObject } = data;

        // Handle submission
        try {
            // Send form data to backend
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
            debug(showDebugging, debugMessages?.frontendError, error);
            addAlert('Unexpected error.', 'Error');
        }

        return null; // Indicate failure
    };

    return { submitForm, submitData };
};

export default useSubmit;
