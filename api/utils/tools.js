/*
 * tool box
 */

var crypto = require('crypto');
var config = require('../../config/config.json');

exports.hashPassword = function(password) {
  var sha1 = crypto.createHmac('sha1', config.key);
  return sha1.update(password).digest('hex');
};