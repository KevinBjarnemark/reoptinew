import { env } from '../../env.js';

/**
 * Makes an API call by appending a relative path to the base API URL.
 *
 *
 * @param {string}   relativePath The relative API path
 * (e.g., '/path/to/api/' )
 * @param {object}   fetchObject The object to pass into the fetch
 * function (optional)
 * @returns {Promise<Response>} The API response object.
 * @throws Errors must be handled by the caller
 */
export const fetchAPI = async (relativePath, fetchObject = {}) => {
    // Build/get the API URL
    const API_URL =
        env.MODE === 'production'
            ? env.VITE_API_URL
            : `http://${env.VITE_API_HOST}:${Number(env.VITE_API_PORT)}`;
    const response = await fetch(`${API_URL}${relativePath}`, fetchObject);
    return response;
};
