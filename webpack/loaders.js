const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.json = {
  test: /\.json$/,
  loader: 'json'
};

exports.bootstapJQueryPlugins = {
  test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
  loader: 'imports',
  query: {
    jQuery: 'jquery'
  }
};

exports.bootstrapFonts = [{
  test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url',
  query: {
    limit: 10000
  }
}, {
  test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
  loader: 'file'
}];

exports.styles = [{
  test: /\.css$/,
  include: /node_modules/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader'
  })
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: [{
      loader: 'css-loader',
      query: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }, {
      loader: 'postcss-loader',
      query: {
        plugins: []
      }
    }, {
      loader: 'sass-loader'
    }]
  })
}, {
  test: /\.css$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: [{
      loader: 'css-loader',
      query: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }, {
      loader: 'postcss-loader',
      query: {
        plugins: []
      }
    }]
  })
}];

exports.linter = {
  test: /\.(ts|tsx)$/,
  loader: 'tslint',
  enforce: 'pre'
};

exports.typesctipt = {
  test: /\.(ts|tsx)$/,
  loaders: ['awesome-typescript-loader']
};

exports.hotLoader = {
  test: /\.(ts|tsx)$/,
  loaders: ['react-hot-loader/webpack']
};