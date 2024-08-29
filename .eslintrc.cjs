/**
 * eslint config
 * @ref http://eslint.cn/
 * @desc generated at 2/23/2023, 3:30:03 PM by quec-cli@1.11.1
 */

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 11,
    },
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    extends: [
        'plugin:react/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-empty-function': 0,
        'react/display-name': 0,
    },
};
