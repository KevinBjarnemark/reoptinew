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
