import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vite.dev/config/
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
});
