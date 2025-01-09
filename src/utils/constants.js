


/**
 * These fields are received from the backend error system.
 * Note, the non_field_errors field is the only field 
 * used in the frontend currently. This list can be extended
 * as the project grows, if .
 */
export const BACKEND_ERROR_FIELDS = {
    NON_FIELD_ERRORS: "non_field_errors",
}

export const ACCESS_TOKEN_LIFETIME = 15; // Minutes

export const VALIDATION_RULES = {
    USERNAME: {
        MAX_LENGTH: 150,
        MIN_LENGTH: 8,
        REGEX: /^[\w.@+-]+$/, // Unicode regex pattern
    },
    PASSWORD: {
        MAX_LENGTH: 128,
        MIN_LENGTH: 8,
    },
    IMAGE: {
        VALID_EXTENSIONS: [
            "jpg", "jpeg", "png", "webp"
        ]
    }
};
