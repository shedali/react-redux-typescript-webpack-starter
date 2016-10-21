const colors = require('colors');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');
const bundleName = helpers.getBundleName();

const getExternals = (target) => {
  var externals = {};
  if (target === helpers.BUILD_TARGET_PLUGIN) {
    externals = nodeExternals();
  }
  return externals;
}

const getEntries = (target) => {
  var entries;
  console.log(`The build target is ${target}.`);
  if (target === helpers.BUILD_TARGET_LIBRARY) {
    entries = '../index.ts';
  }
  else if (target === helpers.BUILD_TARGET_PLUGIN) {
    entries = '../index.ts';
  }
  else {
    entries = {/*
      app: [
        'bootstrap-loader',
        './app/index.tsx'
      ],
      lib: './lib/index.tsx'
    */};
  }
  return entries;
};

const getPlugins = (target) => {
  var plugins;
  // TODO: optimize
  if (target === helpers.BUILD_TARGET_PLUGIN) {
    plugins = [
      new ProgressBarPlugin(),
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      })
    ]
  }
  else {
    plugins = [
      new ProgressBarPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.join(helpers.OUTPUT_PATH, 'vendor-manifest.json')),
        extensions: ['.js']
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        chunksSortMode: 'dependency'
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
      new ExtractTextPlugin({
        filename: `${bundleName}.[name].css`,
        allChunks: true
      })
    ];
  }
  return plugins;
}

module.exports = (options) => {

  return {
    cache: true,
    context: path.resolve(__dirname, '..', 'src'),
    entry: getEntries(options.target),
    output: {
      path: helpers.OUTPUT_PATH,
      filename: '[name].js'
    },
    devServer: {
      outputPath: helpers.OUTPUT_PATH,
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
      loaders: [{
        test: /\.(ts|tsx)$/,
        loaders: ['awesome-typescript-loader']
      }, {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports',
        query: {
          jQuery: 'jquery'
        }
      }, {
        test: /\.json$/,
        loader: 'json'
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
      }, {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 10000
        }
      }, {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      }]
    },
    plugins: getPlugins(options.target),
    externals: getExternals(options.target)
  };

};
