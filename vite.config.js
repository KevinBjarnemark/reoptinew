import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        alias: {
            // App loading context
            '@app-loading-context': path.resolve(
                __dirname,
                './src/context/loading/app-loading/AppLoadingContext',
            ),
            // App loading provider
            '@app-loading-provider': path.resolve(
                __dirname,
                './src/context/loading/app-loading/AppLoadingProvider',
            ),
            // General loading context
            '@general-loading-context': path.resolve(
                __dirname,
                './src/context/loading/general-loading/GeneralLoadingContext',
            ),
            // General loading provider
            '@general-loading-provider': path.resolve(
                __dirname,
                './src/context/loading/general-loading/GeneralLoadingProvider',
            ),
        },
    },
});
