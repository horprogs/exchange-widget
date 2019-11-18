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
    fetch: true,
    MouseEvent: true,
    jest: true,
    it: true,
    describe: true,
    expect: true,
    beforeEach: true,
  },

  rules: {
    'import/prefer-default-export': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/static-property-placement': 0,
    'object-curly-newline': 0,
  },
};
