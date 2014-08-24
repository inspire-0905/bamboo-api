/*
 * Validation tools
 */

var validator = require('validator');
var Member = require('../models/member');
var AccessToken = require('../models/access_token');


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
  var authorization = req.headers['Authorization'];

  if (typeof authorization === 'undefined') {
    return res.json({
      data: '请先登录',
      code: 20004
    });
  } else {
    var tmp = authorization.split(' ');
    if (tmp[0] !== 'Bearer') {
      return res.json({
        data: '不合法的请求',
        code: 20006
      });
    } else {
      AccessToken.checkAccessTokenIsValid(tmp[1], function(err, isValid) {
        if (err) {
          return res.json({
            data: '服务器正在撰写文章',
            code: 50000
          });
        } else {
          if (isValid) {
            next();
          } else {
            return res.json({
              data: '登录过期',
              code: 20005
            });
          }
        }
      });
    }
  }
};

/*
 * Validate whether the user isn't logined
 */
exports.validateIsNotLogined = function(req, res, next) {
  var authoriztion = req.headers['Authorization'];

  if (typeof authorization === 'undefined') {
    next();
  } else {
    res.json({
      data: '已经登录，无需此操作',
      err: 20006
    });
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