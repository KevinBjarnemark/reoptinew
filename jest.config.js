export default {
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/tests/**/*.test.js'],
    moduleFileExtensions: ['js', 'jsx'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        // Mock CSS imports
        '^.+\\.css$': 'identity-obj-proxy', 
    },
};
