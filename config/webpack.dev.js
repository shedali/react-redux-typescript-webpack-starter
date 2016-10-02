const path = require('path');
const webpack = require('webpack');

const PATHS = {
  build: path.join(path.resolve(__dirname, '..'), 'dist')
};

module.exports = (opts) => {

  return {
    context: path.join(path.resolve(__dirname, '..'), 'src'),
    entry: {
      app: path.join(path.resolve(__dirname, '..'), 'src/app/index.tsx')
    },
    output: {
      path: PATHS.build,
      filename: 'bundle.js',
      publicPath: '/static/'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /\.(ts|tsx)$/,
        loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader']
      }, {
        test: /\.json$/,
        loader: 'json'
      }]
    }
  };

};
