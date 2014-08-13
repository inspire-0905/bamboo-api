/*
 * User model
 */

var dbPool = require("./db");

// member object
function Member(email, password, realname) {
  this.email = email;
  this.password = password;
  this.realname = realname;
}

module.exports = Member;

// Save new member to database
Member.prototype.createMember = function(callback) {
  var that = this;

  var values = {
    email: that.email,
    password: that.password,
    realname: that.realname
  };

  dbPool.getConnection(function(err, connection) {
    if (err) {
      return callback(err, null);
    } else {
      connection.query('INSERT INTO member SET ?', values, function(err, rst) {
        connection.release();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, rst.insertId);
        }
      });
    }
  });
};

// Check whether the email is existed
Member.isEmailExisted = function(email, callback) {
  dbPool.getConnection(function(err, connection) {
    if (err) {
      return callback(err, null);
    } else {
      connection.query('SELECT id FROM member WHERE email = ?', [email], function(err, rst) {
        connection.release();
        if (err) {
          return callback(err, null);
        } else {
          var isExisted = rst.length === 0
            ? false
            : true;
          return callback(null, isExisted);
        }
      });
    }
  });
};

// Update member info
Member.updateMember = function(member_id, updateValues, callback) {
  dbPool.getConnection(function(err, connection) {
    if (err) {
      return callback(err, null);
    } else {
      connection.query('UPDATE member SET ? WHERE id = ?', [updateValues, member_id], function(err, rst) {
        connection.release();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, null);
        }
      });
    }
  });
};

// Get member by member email
Member.getMemberByEmail = function(email, callback) {
  dbPool.getConnection(function(err, connection) {
    if (err) {
      return callback(err, null);
    } else {
      connection.query('SELECT * FROM member WHERE email = ?', [email], function(err, rst) {
        connection.release();
        if (err) {
          return callback(err, null);
        } else {
          if (rst.length > 0) {
            return callback(null, rst[0]);
          } else {
            return callback(null, null);
          }
        }
      });
    }
  });
};
