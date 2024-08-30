/**
 * vitest config
 * @ref https://cn.vitest.dev/config/
 * @desc generated at 1/9/2023, 4:18:37 PM by quec-cli@1.7.0
 */

/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        coverage: {
            provider: 'c8',
        },
        includeSource: ['src/**/*.{js,ts}'],
    },
    resolve: {
        alias: {
            'react-native': 'react-native-web',
        },
    },
});
