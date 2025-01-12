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
            // Notification provider
            '@notification-provider': path.resolve(
                __dirname,
                './src/context/notification/NotificationProvider',
            ),
            // Notification provider
            '@notification-context': path.resolve(
                __dirname,
                './src/context/notification/NotificationContext',
            ),
            // @BorderSeparator
            '@border-separator': path.resolve(
                __dirname,
                './src/components/separators/border-separator/BorderSeparator',
            ),
            // Debug
            '@debug': path.resolve(__dirname, './src/utils/log'),
        },
    },
});
