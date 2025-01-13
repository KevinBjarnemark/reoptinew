import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import { PATH_ALIASES } from './constants';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * This function reduces repetition by using a single source of
 * truth, PATH_ALIASES in (constants.js) to generate Vite-compatible
 * module map.
 *
 * Example:
 *
 * Turns:
 * 'custom-name: '<current-directory>/relative-path',
 * Into this:
 * '@custom-name': '<current-directory>/relative-path',
 *
 * @returns {object}
 * @throws Errors can be handled by the caller.
 */
const getPathAliasesViteFormat = () => {
    let result = {};
    Object.entries(PATH_ALIASES).forEach(([alias, relativePath]) => {
        result[`@${alias}`] = resolve(__dirname, `${relativePath}`);
    });
    return result;
};
const pathAliasesViteFormat = getPathAliasesViteFormat();

export default defineConfig({
    plugins: [
        react(),
        legacy({
            targets: [
                'ie 11',
                'chrome 49',
                'firefox 52',
                'safari 9',
                'ios_saf 9',
            ],
        }),
    ],
    resolve: {
        alias: { ...pathAliasesViteFormat },
    },
});
