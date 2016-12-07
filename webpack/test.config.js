const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const concat = require('lodash/concat');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('../config/helpers');
const loaders = require('./loaders');

module.exports = (options) => {

  const config = {
    context: path.join(helpers.ROOT, 'src'),
    module: {
      loaders: concat({
        test: /\.(js|ts|tsx)$/,
        loader: 'istanbul-instrumenter-loader',
        include: path.join(helpers.ROOT, 'src'),
        exclude: [
          /\.spec\.(ts|tsx)$/,
          /node_modules/
        ],
        enforce: 'post'
      }, {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        options: {
          sourceMap: false,
          inlineSourceMap: true
        }
      },
      loaders.json,
      loaders.styles,
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      })
    },
    resolve: {
      modules: [
        'src',
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    externals: [
      'react/addons',
      'react/lib/ExecutionEnvironment',
      'react/lib/ReactContext'
    ],
    plugins: [
      new ExtractTextPlugin({
        filename: helpers.getCssBundleFilename(),
        allChunks: true
      })
    ]
  };

  return config;
};
