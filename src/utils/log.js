/**
 * Logs debugging messages to the console in development.
 *
 * @param {bool}  log Extra conditional for toggling component debugging.
 * @param {string}  name Name/identifier of the log
 * @param {...any}  args Accepts any number of arguments of any type.
 */
export const debug = (log, name, ...args) => {
    // Log to the console if the .env.development file is in use
    if (log && import.meta.env.MODE === 'development') {
        console.log(
            '%cDEBUG:%c %c%s:%c',
            'color: #61b5f1; font-weight: bold;',
            '', // Reset style
            'color: #5a5f61; font-weight: bold;',
            name,
            '', // Reset style
            ...args,
        );
    }
};

/**
 * Logs messages to the console in development.
 *
 * @param {bool}  log Extra conditional for toggling component debugging.
 * @param {string}  name Name/identifier of the log
 * @param {...any}  args Accepts any number of arguments of any type.
 */
export const log = (log, name, ...args) => {
    // Log to the console if the .env.development file is in use
    if (log && import.meta.env.MODE === 'development') {
        console.log(
            '%cLOG:%c %c%s:%c',
            'color: #f1ba61; font-weight: bold;',
            '', // Reset style
            'color: #5a5f61; font-weight: bold;',
            name,
            '', // Reset style
            ...args,
        );
    }
};
