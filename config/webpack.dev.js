const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

module.exports = (opts) => {

  var config = commonConfig(opts);

  if (opts.isHmrEnabled) {
    config = merge(
      {
        entry: {
          app: [
            //'react-hot-loader/patch',
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
