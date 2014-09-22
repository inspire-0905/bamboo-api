/*
 * tool box
 */

var crypto = require('crypto');
var uuid = require('node-uuid');
var config = require('../../config/dev.json');

exports.hashPassword = function(password) {
  var sha1 = crypto.createHmac('sha1', config.key);
  return sha1.update(password).digest('hex');
};

exports.generateAccessToken = function() {
  var buffer = new Buffer(64);
  uuid.v4(null, buffer, 0);
  return buffer.toString('hex');
};

exports.generateExpiredTime = function() {
  var now = parseInt((new Date()).getTime() / 1000);
  return now + 86400000;
};
