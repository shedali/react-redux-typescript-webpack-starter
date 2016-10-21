const webpack = require('webpack');
const merge = require('webpack-merge');

const helpers = require('./helpers');
const bundleName = helpers.getBundleName();

const commonConfig = require('./webpack.common.js');

module.exports = (opts) => {

  opts.target = 'app';

  var config = merge(commonConfig(opts), {
    entry: {
      app: [
        'bootstrap-loader',
        './app/index.tsx'
      ],
      lib: './lib/index.tsx'
    },
    output: {
      path: helpers.OUTPUT_PATH,
      filename: `${bundleName}.[name].umd.js`,
      library: [bundleName, '[name]'],
      libraryTarget: 'umd'
    }
  });

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
