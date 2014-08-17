/*
 * Validation tools
 */

var validator = require('validator');
var Member = require('../models/member');

exports.validateRegister = function(req, res, next) {
  var email = req.param('email');
  var password = req.param('password');

  var isEmail = validator.isEmail(email);

  if (!isEmail) {
    return res.json({
      data: '请填写正确的邮箱',
      code: 20001
    });
  }

  if (password.length < 6 || password.length > 16) {
    return res.json({
      data: '密码长度需在6-16个字符',
      code: 20001
    });
  }

  Member.isEmailExisted(email, function(err, isExisted) {
    if (err) {
      console.error(err);
      return res.json({
        data: '服务器正在撰写文章',
        code: 50000
      });
    } else {
      if (isExisted) {
        return res.json({
          data: '邮箱已经被注册，请更换邮箱',
          code: 20001
        });
      } else {
        next();
      }
    }
  });
};

/*
 * Validate whether the user is logined
 */
exports.validateIsLogined = function(req, res, next) {
  var m_id = req.cookies.m_id;

  if (typeof m_id === 'undefined') {
    return res.json({
      data: '请先登录',
      code: 20004
    });
  } else {
    next();
  }
};

/*
 * Validate whether the user is active
 */
exports.validateIsActive = function(req, res, next) {
  var m_id = req.cookies.m_id;

  if (typeof m_id === 'undefined') {
    return res.json({
      data: '请先登录',
      code: 20004
    });
  } else {
    Member.isActive(m_id, function(err, isActive) {
      if (err) {
        return res.json({
          data: '服务器正在撰写文章',
          code: 50000
        });
      } else {
        if (isActive === null) {
          return res.json({
            data: '用户不存在',
            code: 20002
          });
        } else if (isActive === 0) {
          return res.json({
            data: '请先激活账号',
            code: 20004
          });
        } else {
          next();
        }
      }
    });
  }
};