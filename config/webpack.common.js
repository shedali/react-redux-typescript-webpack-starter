const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  build: path.resolve(__dirname, '..', 'dist')
};

module.exports = (opts) => {

  return {
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
      app: [
        './app/index.tsx'
      ],
      lib: './lib/index.tsx',
      vendor: ['react', 'react-dom']
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',

      // these settings make sense if we want to build the library accessible via global var
      library: '[name]',
      libraryTarget: 'var'
    },
    devServer: {
      outputPath: PATHS.build
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
        test: /\.json$/,
        loader: 'json'
      }]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'bundle.vendor.js'
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        chunksSortMode: 'dependency'
      })
    ]
  };

};
