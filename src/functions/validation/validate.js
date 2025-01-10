import { VALIDATION_RULES } from '../../utils/constants';
import { any } from '../../utils/helpers';

/**
 * Validates common fields in a form (frontend) by throwing custom
 * errors in order.
 *
 * This function should be used during common data submissions,
 * eg., when logging in or signing up. Fields are automatically
 * collected from the formDataDraft and expect reserved fields
 * such as username, password, confirmed_password, and so forth.
 *
 *
 * @param {bool}  formDataDraft An object with
 * @param {str}   fieldArray An array of strings, storing the fields
 * that should be validated.
 * @returns {any} ....
 * @throws Errors are thrown when a field is invalid.
 * 
 * Limitations: 
 * 
 * If this function trows a non-cusom error, it will be returned as a 
 * validation error.   
 */
export const validateCommon = (formDataDraft) => {
    const fields = Object.keys(formDataDraft);

    /**
     * Checks if the given field is present in the formDataDraft
     * array
     *
     * Supports: username, password, confirm_password, and birth_date
     *
     * @param {string} fieldString The field, declared as a string.
     * @returns {boolean} Returns true if the given field exists in
     * the formDataDraft array.
     * @throws Errors must be handled by the caller
     */
    const checkField = (fieldString) => {
        if (any(fieldString, fields)) {
            return true;
        }
        return false;
    };

    switch (true) {
        default:
            break;
        // Username is missing
        case checkField('username') && formDataDraft.username.length < 1: {
            throw new Error('Username is missing');
        }
        // Username length
        case checkField('username') &&
            formDataDraft.username.length <
                VALIDATION_RULES.USERNAME.MIN_LENGTH: {
            throw new Error(
                'Username must be at least ' +
                    `${VALIDATION_RULES.USERNAME.MIN_LENGTH}` +
                    ' characters long.',
            );
        }
        // Username length
        case checkField('username') &&
            formDataDraft.username.length >
                VALIDATION_RULES.USERNAME.MAX_LENGTH: {
            throw new Error(
                'Username is too long.' +
                    `${VALIDATION_RULES.USERNAME.MAX_LENGTH}` +
                    ' is the limit.',
            );
        }
        // Username unicode restrictions (e.g. @)
        case checkField('username') &&
            !VALIDATION_RULES.USERNAME.REGEX.test(formDataDraft.username): {
            throw new Error(
                'Special characters like @, +, and ' +
                    'others are not allowed.',
            );
        }
        // Password is missing
        case checkField('password') && formDataDraft.password.length < 1: {
            throw new Error('Password is missing.');
        }
        // Password is too short
        case checkField('password') &&
            formDataDraft.password.length <
                VALIDATION_RULES.PASSWORD.MIN_LENGTH: {
            throw new Error('Password is too short.');
        }
        // Password must be a certain length
        case checkField('password') &&
            formDataDraft.password.length >
                VALIDATION_RULES.PASSWORD.MAX_LENGTH: {
            throw new Error(
                'Password must be at least ' +
                    `${VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters.`,
            );
        }
        // Passwords must be identical
        case checkField('password') &&
            checkField('confirm_password') &&
            formDataDraft.password !== formDataDraft.confirm_password: {
            throw new Error('Passwords must be identical.');
        }
        // Birth date is missing
        case checkField('birth_date') && !formDataDraft.birth_date: {
            throw new Error('Birth date is missing.');
        }
        // Birth date cannot be in the future
        case checkField('birth_date') &&
            new Date(formDataDraft.birth_date) >= new Date(): {
            throw new Error('Birth date cannot be in the future.');
        }
    }
};
