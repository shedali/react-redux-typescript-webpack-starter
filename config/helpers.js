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
  return hasProcessFlag('hot');
};

exports.ROOT = path.resolve(__dirname, '..');