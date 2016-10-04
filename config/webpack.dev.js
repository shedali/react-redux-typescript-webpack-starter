const path = require('path');
const webpack = require('webpack');

const PATHS = {
  build: path.resolve(__dirname, '..', 'dist')
};

module.exports = (opts) => {

  return {
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
      app: './app/index.tsx',
      lib: './lib/index.tsx',
      vendor: ['react', 'react-dom']
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
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
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      //new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'bundle.vendor.js'
      })
    ]
  };

};
