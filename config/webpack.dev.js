const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = (opts) => {

  const devConfig = {
    entry: {
      app: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/index.tsx'
      ]
    },
    module: {
      loaders: [{
        test: /\.(ts|tsx)$/,
        loaders: ['react-hot-loader/webpack']
      }]
    }
  };

  const config = merge(
    {
      entry: {
        app: [
          'react-hot-loader/patch',
          'webpack-dev-server/client?http://localhost:8080',
          'webpack/hot/only-dev-server',
        ]
      }
    },
    commonConfig({env: ENV}),
    {
      module: {
        loaders: [{
          test: /\.(ts|tsx)$/,
          loaders: ['react-hot-loader/webpack']
        }]
      }
    }
  );

  return config;
};
