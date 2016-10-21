const path = require('path');
const defaults = require('./defaults.json');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

exports.hasProcessFlag = hasProcessFlag;

exports.getHost = function() {
  return process.env.HOST || defaults.host;
};

exports.getPort = function() {
  return process.env.PORT || defaults.port;
};

exports.getEnv = function() {
  return process.env.NODE_ENV;
};

exports.isHmrEnabled = function() {
  return hasProcessFlag('hot')
};

const BUILD_TARGET_DEFAULT = defaults.target;
const BUILD_TARGET_PLUGIN = 'plugin';
const BUILD_TARGET_LIBRARY = 'lib';
const BUILD_TARGET_APP = 'app';

exports.getBuildTarget = function() {
  return process.env.TARGET || BUILD_TARGET_DEFAULT;
}

exports.BUILD_TARGET_DEFAULT = BUILD_TARGET_DEFAULT;
exports.BUILD_TARGET_PLUGIN = BUILD_TARGET_PLUGIN;
exports.BUILD_TARGET_LIBRARY = BUILD_TARGET_LIBRARY;
exports.BUILD_TARGET_APP = BUILD_TARGET_APP;

exports.ROOT = path.resolve(__dirname, '..');
exports.OUTPUT_PATH = path.join(exports.ROOT, 'dist');
exports.BUNDLE_OUTPUT_PATH = path.join(exports.OUTPUT_PATH, 'bundles');

exports.getBundleName = function() {
  return defaults.bundleName;
}