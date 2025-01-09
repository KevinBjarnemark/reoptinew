/**
 * This is a backend error code/identifier that identifies
 * non-field errors
 */
export const NON_FIELD_ERRORS_STRING = 'non_field_errors';

export const ACCESS_TOKEN_LIFETIME = 15; // Minutes

export const VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 150,
        REGEX: /^[\w.@+-]+$/, // Unicode regex pattern
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
    },
    IMAGE: {
        VALID_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
    },
};
