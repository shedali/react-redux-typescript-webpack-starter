const path = require('path');
const webpack = require('webpack');
const colors = require('colors');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const helpers = require('../config/helpers');

function getPlugins() {

  var plugins = [
    new ProgressBarPlugin(),
    new webpack.DllPlugin({
      path: path.join(helpers.OUTPUT_PATH, '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ];

  if (helpers.isProd()) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
  }

  return plugins;
}

module.exports = () => {

  console.log('Building vendor bundle...'.green);

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
      path: helpers.OUTPUT_PATH,
      filename: jsBundleFilename,
      sourceMapFilename: `${jsBundleFilename}.map`,
      library: '[name]_[hash]',
      libraryTarget: libraryTarget
    },
    devtool: 'source-map',
    plugins: getPlugins()
  };


};
