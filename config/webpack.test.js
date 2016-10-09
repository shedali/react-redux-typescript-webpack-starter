const webpack = require('webpack');
const merge = require('webpack-merge');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = (opts) => {

  const config = {
    module: {
      loaders: [{
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        query: {
          sourceMap: false,
          inlineSourceMap: true,
          compilerOptions: {
            removeComments: true
          }
        }
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
