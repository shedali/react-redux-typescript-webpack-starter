const path = require('path');
const webpack = require('webpack');
const colors = require('colors');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const helpers = require('../config/helpers');

module.exports = () => {

  console.log('Building vendor bundle...'.green);

  var outputPath = helpers.getBuildTarget() === helpers.BUILD_TARGET_LIBRARY ?
    helpers.BUNDLE_OUTPUT_PATH : helpers.OUTPUT_PATH;

  var libraryTarget = 'umd';
  var jsBundleFilename = helpers.getBundleName() + '.[name].' + libraryTarget;
  if (helpers.isProd()) {
    jsBundleFilename  += '.min';
  }
  jsBundleFilename += '.js';

  return {
    context: helpers.ROOT,
    entry: {
      vendor: Object.keys(require('../package.json').dependencies)
    },
    output: {
      path: outputPath,
      filename: jsBundleFilename,
      sourceMapFilename: `${jsBundleFilename}.map`,
      library: '[name]_[hash]',
      libraryTarget: libraryTarget
    },
    devtool: 'source-map',
    plugins: [
      new ProgressBarPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.DllPlugin({
        path: path.join(outputPath, '[name]-manifest.json'),
        name: '[name]_[hash]'
      })
    ]
  };


};
