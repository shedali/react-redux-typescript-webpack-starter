const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const concat = require('lodash/concat');

const helpers = require('../config/helpers');
const bundleName = helpers.getBundleName();

const loaders = require('./loaders');

function getPlugins() {

  var bundleFilename = bundleName + '.[name]';
  if (helpers.isProd()) {
    bundleFilename  += '.min';
  }
  var cssBundleFilename = bundleFilename + '.css';

  // TODO: replace by value from bundle.json
  var libraryTarget = 'umd';
  var vendorBundleFilename = bundleName + '.vendor';
  vendorBundleFilename += '.' + libraryTarget;
  if (helpers.isProd()) {
    vendorBundleFilename  += '.min';
  }
  vendorBundleFilename += '.js';

  var plugins = [
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DllReferencePlugin({
      context: helpers.ROOT,
      manifest: require(path.join(helpers.OUTPUT_PATH, 'vendor-manifest.json')),
      extensions: ['.js']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: helpers.getTitle(),
      vendorBundlePath: vendorBundleFilename,
      chunksSortMode: 'dependency'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin({
      filename: cssBundleFilename,
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

  var bundleFilename = bundleName + '.[name]';
  if (helpers.isProd()) {
    bundleFilename  += '.min';
  }
  var jsBundleFilename = bundleFilename + '.js';

  var config = {
    cache: true,
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
      app: [
        'bootstrap-loader',
        './app/index.tsx'
      ]
    },
    output: {
      path: helpers.OUTPUT_PATH,
      filename: jsBundleFilename,
      sourceMapFilename: `${jsBundleFilename}.map`,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    devServer: {
      host: helpers.getHost(),
      port: helpers.getPort(),
      contentBase: 'dist'
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
        loaders.typescript,
        loaders.bootstapJQueryPlugins,
        loaders.json,
        loaders.styles,
        loaders.bootstrapFonts
      )
    },
    plugins: getPlugins()
  };

  if (helpers.isHmrEnabled()) {
    config = merge(
      {
        entry: {
          app: [
            `webpack-dev-server/client?http://${helpers.getHost()}:${helpers.getPort()}`,
            'webpack/hot/only-dev-server'
          ]
        }
      },
      {
        module: {
          loaders: [
            loaders.hotLoader
          ]
        }
      },
      config
    );
  }

  return config;
};
