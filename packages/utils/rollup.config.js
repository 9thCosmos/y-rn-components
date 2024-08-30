// @ref https://rollupjs.org/guide/zh/
import glob from 'glob';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import path from 'path';
import { fileURLToPath } from 'url';

export default {
    input: Object.fromEntries(
        glob.sync('src/**/*.ts').map((file) => [
            // This remove `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            path.relative('src', file.slice(0, file.length - path.extname(file).length)),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            fileURLToPath(new URL(file, import.meta.url)),
        ])
    ),
    plugins: [
        typescript(),
        replace({
            'import.meta.vitest': 'undefined',
            preventAssignment: false,
        }),
    ],
    external: ['react-native'],
    output: {
        dir: 'dist',
        format: 'esm',
        exports: 'named',
        chunkFileNames: 'chunks/[name]-[hash].js',
    },
};
