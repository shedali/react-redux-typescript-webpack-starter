const path = require('path');
const webpack = require('webpack');

const PATHS = {
  build: path.resolve(__dirname, '..', 'dist')
};

module.exports = (opts) => {

  return {
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
      app: './app/index.tsx'
    },
    output: {
      path: PATHS.build,
      filename: 'bundle.js',
      publicPath: '/static/'
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
        loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader']
      }, {
        test: /\.json$/,
        loader: 'json'
      }]
    }
  };

};
