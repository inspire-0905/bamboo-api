/*
 * Access token model
 */

var tools = require('../utils/tools');
var dbPool = require('./db');

function AccessToken(memberId) {
  this.member_id = memberId;
  this.access_token = tools.generateAccessToken();
  this.expired_at = tools.generateExpiredTime();
}

module.exports = AccessToken;

/*
 * Create a new access token
 */
AccessToken.prototype.save = function(callback) {
  var that = this;
  var created_at = parseInt((new Date()).getTime() / 1000);

  var data = {
    member_id: that.member_id,
    access_token: that.access_token,
    expired_at: that.expired_at,
    created_at: created_at
  };

  dbPool.getConnection(function(err, conn) {
    if (err) {
      return callback(err, null);
    } else {
      sql = 'INSERT INTO access_token SET ?';
      conn.query(sql, data, function(err, rst) {
        if (err) {
          return callback(err, null);
        } else {
          delete data.member_id;
          delete data.created_at;
          return callback(null, data);
        }
      });
    }
  });
};

/*
 * Check whether the access_token is valid
 * 
 * param: access_token
 */
AccessToken.checkAccessTokenIsValid = function(access_token, callback) {
  var sql = null;
  var isValid = false;

  dbPool.getConnection(function(err, conn) {
    if (err) {
      return callback(err, null);
    } else {
      sql = 'SELECT * FROM access_token WHERE access_token = ? AND is_deleted = 1';
      conn.query(sql, [access_token], function(err, rst) {
        // Release connection
        conn.release();
        if (err) {
          return callback(err, null);
        } else {
          if (rst.length === 0) {
            return callback(null, isValid);
          } else {
            var obj = rst[0];
            var now = parseInt((new Date()).getTime() / 1000);
            if (now < obj.expired_at) {
              isValid = true;
            }
            return callback(null, isValid);
          }
        }
      });
    }
  });
};

/*
 * Delete the access token
 */
AccessToken.revoke = function(access_token, callback) {
  var sql = null;

  dbPool.getConnection(function(err, conn) {
    if (err) {
      return callback(err, null);
    } else {
      sql = 'UPDATE access_token SET ? WHERE access_token = ?';
      var updatedValues = {
        is_deleted: 1
      };
      conn.query(sql, [updatedValues, access_token], function(err, rst) {
        // Release connection
        conn.release();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, null);
        }
      });
    }
  });
};

/*
 * Get the member'id by access token
 */
AccessToken.getMemberIdByAccessToken = function(accessToken, callback) {
  var sql = null;
  var memberId = null;

  dbPool.getConnection(function(err, conn) {
    if (err) {
      return callback(err, null);
    } else {
      sql = 'SELECT member_id FROM access_token WHERE access_token = ?';
      conn.query(sql, [accessToken], function(err, rst) {
        // Release connection
        conn.release();
        if (err) {
          return callback(err, null);
        } else {
          if (rst.length !== 0) {
            memberId = rst[0].member_id;
          }
          return callback(null, memberId);
        }
      });
    }
  });
}; 