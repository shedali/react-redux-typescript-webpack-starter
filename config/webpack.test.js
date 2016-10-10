const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = (opts) => {

  const config = {
    context: path.resolve(__dirname, '..', 'src'),
    module: {
      loaders: [{
        test: /\.(js|ts|tsx)$/,
        loader: 'istanbul-instrumenter-loader',
        include: path.resolve(__dirname, '..', 'src'),
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
      }, {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      }]
    },
    resolve: {
      modules: [
        'src',
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    externals: {
      cheerio: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  };

  return config;
};
