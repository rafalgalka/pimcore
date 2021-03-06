const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

// jwilder/nginx-proxy allows to define multiple virtual hosts
// see: https://github.com/jwilder/nginx-proxy#multiple-hosts
const VIRTUAL_HOST = (process.env.APP_VIRTUAL_HOST).split(',')[0] || 'localhost';
const ENV = process.env.NODE_ENV || 'production';

const extractStyles = new ExtractTextPlugin({
  filename: '[name].css',
  disable: ENV === 'development',
});

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    website: ['./static/scripts/index.js', './static/styles/website.scss'],
    editmode: './static/styles/editmode.scss',
  },
  output: {
    publicPath: '/website/var/static/',
    path: path.resolve(__dirname, '../var/static'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.scss$/,
        use: extractStyles.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/',
          },
        },
      },
    ],
  },
  plugins: [
    extractStyles,
    new SuppressChunksPlugin([
      { name: 'editmode', match: /\.js.*$/ },
    ]),
    new BrowserSyncPlugin({
      open: false,
      notify: false,
      proxy: 'app',
      host: VIRTUAL_HOST,
      port: process.env.BROWSERSYNC_PORT || 8000,
      files: [
        'website/**',
        '!website/var/**',
        '!website/static/**',
        'plugins/**',
      ],
    }),
  ],
};
