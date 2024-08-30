import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
    base: '/quec-panel/',
    publicPath: '/quec-panel/',
    favicons: ['/quec-panel/logo.svg'],
    // apiParser: {
    //     // @ts-ignore
    //     resolveFilter: (args) => {
    //         return true;
    //     },
    // },
    // resolve: {
    //     entryFile: './auto-docs-api.ts',
    // },
    themeConfig: {
        name: 'QPanel',
        logo: '/quec-panel/logo.svg',
        socialLinks: {
            gitlab: 'http://gitlab.quectel.com:8108/frontend/quec-panel',
        },
    },
    outputPath: 'docs-dist',
    alias: {
        '@quec/panel-base-ui$': path.resolve(__dirname, '../packages/base-ui/dist/index.js'),
        '@quec/panel-theme$': path.resolve(__dirname, '../packages/theme/dist/index.js'),
        'react-native-svg$': require.resolve('react-native-svg-web'),
        'react-native$': require.resolve('react-native-web'),
    },
});
