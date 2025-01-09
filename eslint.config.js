import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';

export default [
    { ignores: ['dist', 'node_modules'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                jest: true,
            },
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        settings: { react: { version: '18.3' } },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            jest,
            prettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            ...jest.configs.recommended.rules,
            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react/prop-types': 'off',
            'no-unused-vars': 'warn',
            'no-undef': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            // Line length restrictions
            'max-len': [
                'warn',
                {
                    code: 79,
                    ignoreUrls: true,
                    ignoreComments: false,
                },
            ],
            // Enforce consistent naming for Jest functions
            'jest/consistent-test-it': ['error', { fn: 'test' }],
            // Warn about skipped tests
            'jest/no-disabled-tests': 'warn',
            // Prevent duplicate test titles
            'jest/no-identical-title': 'error',
            'prettier/prettier': 'warn',
        },
    },
];
