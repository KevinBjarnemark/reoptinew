import { env } from '../../env.js';

export let testLogs = [];

/**
 * Logs debugging messages to the console in development.
 *
 * Testlogs:
 *
 * This function also builds testLogs during tests to validate
 * React states, and more.
 *
 * @param {bool}  log Extra conditional for toggling component debugging.
 * @param {string}  name Name/identifier of the log
 * @param {...any}  args Accepts any number of arguments of any type.
 */
export const debug = (log, name, ...args) => {
    // Log to the console if the .env.development file is in use
    if (log && env.MODE === 'development') {
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
    // Save test logs
    // Process should be available in the testing environment
    // therefore, ignoring ES Lint error.
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'test' && env.MODE === 'development') {
        testLogs.push(name, ...args);
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
    if (log && env.MODE === 'development') {
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
