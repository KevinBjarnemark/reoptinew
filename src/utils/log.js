import { env } from '../../env.js';

export let testLogs = [];

/**
 * Logs debugging messages to the console in development.
 *
 * This function logs formatted debugging messages with categorized
 * log types (DEBUG, ERROR, LOG, TEST).
 * In testing environments, it also builds testLogs to validate
 * React states, and other testable conditions.
 *
 * @param {string}  type Specifies the type of log. The following log
 * types are supported:
 * - 'd': DEBUG (general debugging messages)
 * - 's': SUCCESS (success messages eg., 200 HTTP responses)
 * - 'e': ERROR (error messages relevant to the developer)
 * - 'l': LOG (general log messages)
 * - 't': TEST (messages for testing purposes)
 * - Any other value defaults to 'UNKNOWN' (Uncategorized log messages)
 * @param {bool}  log Extra conditional for toggling component debugging.
 * @param {string}  name Name/identifier of the log.
 * @param {...any}  args Accepts any number of arguments of any type.
 */
export const debug = (type, log, name, ...args) => {
    // Log to the console if the .env.development file is in use
    if (log && env.MODE === 'development') {
        let logName = 'UNKNOWN';
        let logColor = '#f1d261';
        switch (type) {
            default: {
                logName = 'UNKNOWN';
                logColor = '#f1d261';
                break;
            }
            case 'd': {
                logName = 'DEBUG';
                logColor = '#61b5f1';
                break;
            }
            case 's': {
                logName = 'SUCCESS';
                logColor = '#6af161';
                break;
            }
            case 'e': {
                logName = 'ERROR';
                logColor = '#f16161';
                break;
            }
            case 'l': {
                logName = 'LOG';
                logColor = '#f1ba61';
                break;
            }
            case 't': {
                logName = 'TEST';
                logColor = '#bf61f1';
                break;
            }
        }

        console.log(
            `%c${logName}:%c %c%s%c`,
            `color: ${logColor}; font-weight: bold;`,
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
