module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
    '@babel/preset-flow',
  ];
  const plugins = [
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-classes',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
