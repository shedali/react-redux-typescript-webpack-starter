const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('../config/helpers');
const bundleName = helpers.getBundleName();

module.exports = (opts) => {

  var config = {
    cache: true,
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
      lib: './lib/index.tsx',
      app: [
        'bootstrap-loader',
        './app/index.tsx'
      ]
    },
    output: {
      path: helpers.OUTPUT_PATH,
      filename: `${bundleName}.[name].js`
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
    plugins: [
      new ProgressBarPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.join(helpers.OUTPUT_PATH, 'vendor-manifest.json')),
        extensions: ['.js']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'lib'
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
    ]
  };

  if (opts.isHmrEnabled) {
    config = merge(
      {
        entry: {
          app: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server'
          ]
        }
      },
      config,
      {
        module: {
          loaders: [{
            test: /\.(ts|tsx)$/,
            loaders: ['react-hot-loader/webpack']
          }]
        }
      }
    );

  }

  return config;
};
