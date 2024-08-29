/**
 * lint-staged config
 * @ref https://www.npmjs.com/package/lint-staged
 * @desc generated at 2/23/2023, 3:30:07 PM by quec-cli@1.11.1
 */

module.exports = {
    // '*.{ts,tsx}': ['tsc-files --noEmit'],
    '*.{[tj]s,[tj]sx,[cm]js}': ['prettier --write', 'eslint --cache --fix'],
    '*.{css,scss}': ['prettier --write'],
    '*.json': ['prettier --write'],
    '*.html': ['prettier --write'],
};
