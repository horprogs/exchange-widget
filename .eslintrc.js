module.exports = {
    root: true,

    parser: 'babel-eslint',

    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            experimentalObjectRestSpread: true,
            jsx: true,
        },
    },

    extends: ['airbnb'],

    globals: {
        window: true,
        document: true,
        ymaps: true,
    },

    rules: {
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'ignore',
            },
        ],
        'function-paren-newline': [0],
        indent: ['error', 4, { SwitchCase: 1 }],
        'operator-linebreak': ['error'],
        'jsx-a11y/anchor-has-content': 'warn',
        'react/jsx-boolean-value': ['error', 'always'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/forbid-prop-types': ['error', { forbid: ['any'] }],
        'react/prefer-stateless-function': [0],
        'react/require-default-props': [0],
        'react/no-did-mount-set-state': false,
        'react/sort-comp': [
            1,
            {
                order: [
                    'type-annotations',
                    'static-methods',
                    'lifecycle',
                    'everything-else',
                    'render',
                ],
            },
        ],
        'import/extensions': [0],
        'rule-empty-line-before': [0],
        'rule-nested-empty-line-before': [0],
        'rule-non-nested-empty-line-before': [0],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'object-curly-newline': [0],
        'arrow-parens': [0]
    },
};
