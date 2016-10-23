const colors = require('colors');
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const concat = require('lodash/concat');

const helpers = require('../config/helpers');
const loaders = require('./loaders');

function getPlugins() {
  var plugins = [
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DllReferencePlugin({
      context: helpers.ROOT,
      manifest: require(path.join(helpers.BUNDLE_OUTPUT_PATH, 'vendor-manifest.json')),
      extensions: ['.js']
    }),
    new ExtractTextPlugin({
      filename: helpers.getCssBundleFilename(),
      allChunks: true
    })
  ];

  if (helpers.isProd()) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  }

  return plugins;
}

module.exports = (options) => {

  var libraryTarget = 'umd';
  var jsBundleFilename = helpers.getBundleName() + '.' + libraryTarget;
  if (helpers.isProd()) {
    jsBundleFilename  += '.min';
  }
  jsBundleFilename += '.js';

  return {
    cache: true,
    context: path.join(helpers.ROOT, 'src'),
    entry: '../index.ts',
    output: {
      path: helpers.BUNDLE_OUTPUT_PATH,
      filename: jsBundleFilename,
      sourceMapFilename: `${jsBundleFilename}.map`,
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
      loaders: concat(
        loaders.typesctipt,
        loaders.styles,
        loaders.linter
      )
    },
    plugins: getPlugins()
  };

};
