/*
 * User model
 */

var dbPool = require("./db");

// member object
function Member(email, password) {
  this.email = email;
  this.password = password;
}

module.exports = Member;

// Save new member to database
Member.prototype.createMember = function(callback) {
  var that = this;

  var values = {
    email: that.email,
    password: that.password
  };

  dbPool.getConnection(function(err, connection) {
    if (err) {
      return callback(err, null);
    } else {
      var sql = 'INSERT INTO member SET ?';
      connection.query(sql, values, function(err, rst) {
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
      var sql = 'SELECT id FROM member WHERE email = ?';
      connection.query(sql, [email], function(err, rst) {
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
      var sql = 'UPDATE member SET ? WHERE id = ?';
      connection.query(sql, [updateValues, member_id], function(err, rst) {
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
      var sql = 'SELECT * FROM member WHERE email = ?';
      connection.query(sql, [email], function(err, rst) {
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

// Get member by member id
Member.getMemberById = function(memberId, callback) {
  dbPool.getConnection(function(err, connection) {
    if (err) {
      return callback(err, null);
    } else {
      var sql = 'SELECT * FROM member WHERE id = ?';
      connection.query(sql, [memberId], function(err, rst) {
        if (err) {
          return callback(err, null);
        } else {
          if (rst.length === 0) {
            return callback(null, null);
          } else {
            return callback(null, rst[0])
          }
        }
      });
    }
  });
};

// Whether the member is active
Member.isActive = function(memberId, callback) {
  dbPool.getConnection(function(err, connection) {
    if (err) {
      return callback(err, null);
    } else {
      var sql = 'SELECT is_active FROM member WHERE id = ?';
      connection.query(sql, [memberId], function(err, rst) {
        if (err) {
          return callback(err, null);
        } else {
          if (rst.length !== 0) {
            return callback(null, rst[0].is_active);
          } else {
            return callback(null, null);
          }
        }
      });
    }
  });
};
