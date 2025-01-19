import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import { PATH_ALIASES } from './constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Uses the PATH_ALIASES from constants.js to
 *
 * Usecase:
 *
 * This function reduces repetition by using a single source of
 * truth, PATH_ALIASES in (constants.js) to generate Jest-compatible
 * module map.
 *
 * Example:
 *
 * Turns:
 * 'custom-name: '<current-directory>/relative-path',
 * Into this:
 * '^@custom-name(.*)$': '<current-directory>/relative-path$1',
 *
 * @returns {object}
 * @throws Errors can be handled by the caller.
 */
const getPathAliasesJestFormat = () => {
    let result = {};
    Object.entries(PATH_ALIASES).forEach(([alias, relativePath]) => {
        result[`^@${alias}(/.*)?$`] = resolve(__dirname, `${relativePath}$1`);
    });
    return result;
};
const pathAliasesJestFormat = getPathAliasesJestFormat();

export default {
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/tests/**/*.test.js'],
    moduleFileExtensions: ['js', 'jsx'],
    setupFiles: [`${__dirname}/jest.setup.js`],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        // Mock all CSS files
        '^.+\\.css$': 'identity-obj-proxy',
        // Mock specified file types
        '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': path.join(
            __dirname,
            '__mocks__',
            'fileMock.js',
        ),
        // All path aliases (from env.js)
        ...pathAliasesJestFormat,
    },
};
