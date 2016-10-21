const path = require('path');
const webpack = require('webpack');
const colors = require('colors');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const helpers = require('./helpers');
const bundleName = helpers.getBundleName();

module.exports = () => {

  console.log('Building vendor bundle...'.green);

  var outputPath = helpers.getBuildTarget() === helpers.BUILD_TARGET_LIBRARY ?
    helpers.BUNDLE_OUTPUT_PATH : helpers.OUTPUT_PATH;

  return {
    context: helpers.ROOT,
    entry: {
      vendor: Object.keys(require('../package.json').dependencies)
    },
    output: {
      path: outputPath,
      filename: `${bundleName}.[name].umd.js`,
      sourceMapFilename: `${bundleName}.[name].umd.js.map`,
      library: '[name]_[hash]',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    plugins: [
      new ProgressBarPlugin(),

      new webpack.optimize.DedupePlugin(),

      new webpack.DllPlugin({
        path: path.join(outputPath, '[name]-manifest.json'),
        name: '[name]_[hash]'
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      })
    ]
  };


};
