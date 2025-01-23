/**
 * Returns true if the specified value is found within the array.
 *
 * @param {array} value
 * @param {array} listOfValues
 * @returns {boolean}
 * @throws Errors must be handled by the caller
 */
export const any = (value, listOfValues) => {
    return listOfValues.includes(value);
};

/**
 * Check if the inputed value is an object.
 *
 */
export const isObject = (value, requireContent = false) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false; // Not an object
    }

    return requireContent ? Object.keys(value).length > 0 : true;
};

/**
 * Check if the inputed value is an array.
 *
 */
export const isArray = (value, requireContent = false) => {
    if (typeof value !== 'object' || value === null || !Array.isArray(value)) {
        return false; // Not an array
    }

    return requireContent ? value.length > 0 : true;
};
