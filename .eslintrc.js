module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        // "@typescript-eslint/explicit-member-accessibility": 0,
        // '@typescript-eslint/interface-name-prefix': 0,
        // 'prettier/prettier': ['off', { singleQuote: true }],
        // "@typescript-eslint/no-parameter-properties": 0,
        // '@typescript-eslint/explicit-function-return-type': 0,
        // '@typescript-eslint/explicit-module-boundary-types': 0,
        // '@typescript-eslint/no-explicit-any': 0,
        // "@typescript-eslint/ban-types": 0,
        // "@typescript-eslint/no-var-requires": 0
    },
};