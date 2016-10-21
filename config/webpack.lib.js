const colors = require('colors');
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');
const bundleName = helpers.getBundleName();

module.exports = (options) => {

  return {
    cache: true,
    context: path.resolve(__dirname, '..', 'src'),
    entry: '../index.ts',
    output: {
      path: helpers.BUNDLE_OUTPUT_PATH,
      filename: `${bundleName}.umd.js`,
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
      new webpack.NamedModulesPlugin(),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.join(helpers.BUNDLE_OUTPUT_PATH, 'vendor-manifest.json')),
        extensions: ['.js']
      }),
      new ExtractTextPlugin({
        filename: `${bundleName}.css`,
        allChunks: true
      })
    ]
  };

};
