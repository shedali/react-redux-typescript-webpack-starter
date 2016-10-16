const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const PATHS = {
  build: path.resolve(__dirname, '..', 'dist')
};

module.exports = (opts) => {

  return {
    cache: true,
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
      app: './app/index.tsx',
      lib: './lib/index.tsx'
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    devServer: {
      outputPath: PATHS.build,
      contentBase: 'dist'
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
      new ProgressBarPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.join(PATHS.build, 'vendor-manifest.json')),
        extensions: ['.js']
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        chunksSortMode: 'dependency'
      })
    ]
  };

};
