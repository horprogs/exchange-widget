const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: () => [
      autoprefixer({
        grid: true,
      }),
    ],
  },
};

const config = {
  mode: devMode ? 'development' : 'production',
  entry: {
    index: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /vendor\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: (name) =>
          name.endsWith('.css') && !name.endsWith('vendor.css'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              modules: {
                localIdentName: '[name]_[local]__[hash:base64:5]',
              },
            },
          },
          postcssConfig
        ],
      },
      {
        test: /\.(png|gif|jpe?g)/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:6].[ext]',
        },
      },
    ],
  },
  devServer: {
    publicPath: 'http://localhost:3000/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/templates/default.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};

module.exports = config;
