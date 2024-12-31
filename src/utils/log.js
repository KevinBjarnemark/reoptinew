
/**
 * Logs debugging messages to the console in development.
 * 
 * @param {bool}  log Extra conditional for toggling component debugging.
 * @param {...any}  args Accepts any number of arguments of any type.
 */
export const debug = (log, ...args) => {
    // Log to the console if the .env.development file is in use
    if (log && import.meta.env.MODE === "development") {
        console.log(
            "%cDEBUG:",
            "color: #61b5f1; font-weight: bold;", 
            ...args);
    }
};

/**
 * Logs messages to the console in development.
 * 
 * @param {bool}  log Extra conditional for toggling component debugging.
 * @param {...any}  args Accepts any number of arguments of any type.
 */
export const log = (log, ...args) => {
    // Log to the console if the .env.development file is in use
    if (import.meta.env.MODE === "development") {
        console.log(
            "%cLOG:",
            "color: #f1ba61; font-weight: bold;", 
            ...args);
    }
};
