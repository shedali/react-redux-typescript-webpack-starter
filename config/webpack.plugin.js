const colors = require('colors');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');
const bundleName = helpers.getBundleName();

module.exports = (options) => {

  var dependencies = Object.keys(require('../package.json').dependencies || {});
  if (dependencies.length > 0) {
    console.warn(`
      WARNING: Plugins rely on their host package and DO NOT get their dependencies bundled.
               Consider moving dependencies to peerDependencies in package.json!
    `.red);
  }

  return {
    cache: true,
    context: path.join(helpers.ROOT, 'src'),
    entry: '../index.ts',
    output: {
      path: helpers.BUNDLE_OUTPUT_PATH,
      filename: `${bundleName}.umd.js`,
      sourceMapFilename: `${bundleName}.umd.js.map`,
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    resolve: {
      modules: [
        'src',
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /\.(ts|tsx)$/,
        loaders: ['awesome-typescript-loader']
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }, {
            loader: 'sass-loader'
          }, {
            loader: 'postcss-loader'
          }]
        })
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }, {
            loader: 'postcss-loader'
          }]
        })
      }]
    },
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin({
        filename: `${bundleName}.css`,
        allChunks: true
      })
    ],
    externals: nodeExternals()
  };

};
