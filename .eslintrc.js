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
};
