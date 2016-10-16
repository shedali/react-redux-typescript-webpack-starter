const helpers = require('./config/helpers');

switch (process.env.NODE_ENV) {
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({
      isHmrEnabled: helpers.isHmrEnabled()
    });
}