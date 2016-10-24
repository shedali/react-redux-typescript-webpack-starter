const path = require('path');
const appConfig = require('./app.json');
const bundleConfig = require('./bundle.json');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

exports.hasProcessFlag = hasProcessFlag;

exports.getTitle = function() {
  return appConfig.title;
};

exports.getHost = function() {
  return process.env.HOST || appConfig.host;
};

exports.getPort = function() {
  return process.env.PORT || appConfig.port;
};

exports.getEnv = function() {
  return process.env.NODE_ENV;
};

function isProd() {
  return process.env.NODE_ENV === 'production';
}

exports.isProd = isProd;

exports.isHmrEnabled = function() {
  return hasProcessFlag('hot');
};

exports.ROOT = path.resolve(__dirname, '..');
exports.OUTPUT_PATH = path.join(exports.ROOT, 'dist');
exports.BUNDLE_OUTPUT_PATH = path.join(exports.OUTPUT_PATH, 'bundles');

function getBundleName() {
  return bundleConfig.bundleName;
}

exports.getBundleName = getBundleName;

exports.getCssBundleFilename = function() {
  var cssBundleName = getBundleName();
  if (isProd()) {
    cssBundleName += '.min';
  }
  cssBundleName += '.css';
  return cssBundleName;
};
