const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.json = {
  test: /\.json$/,
  loader: 'json-loader'
};

exports.bootstapJQueryPlugins = {
  test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
  loader: 'imports-loader',
  query: {
    jQuery: 'jquery'
  }
};

exports.bootstrapFonts = [{
  test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url-loader',
  query: {
    limit: 10000
  }
}, {
  test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
  loader: 'file-loader'
}];

exports.styles = [{
  test: /\.css$/,
  include: /node_modules/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader'
  })
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
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
    fallback: 'style-loader',
    use: [{
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
  loader: 'tslint-loader',
  enforce: 'pre'
};

exports.typescript = {
  test: /\.(ts|tsx)$/,
  loaders: ['awesome-typescript-loader']
};

exports.hotLoader = {
  test: /\.(ts|tsx)$/,
  loaders: ['react-hot-loader/webpack']
};