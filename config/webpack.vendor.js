const path = require('path');
const webpack = require('webpack');

const dependencies = Object.keys(require('../package.json').dependencies);

console.log('vendor dependencies', dependencies);

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: dependencies
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    library: '[name]_[hash]'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),

    new webpack.DllPlugin({
      path: path.resolve(__dirname, '..', 'dist', '[name]-manifest.json'),
      name: '[name]_[hash]'
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]

};
