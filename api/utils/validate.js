/*
 * Validation tools
 */

var validator = require('validator');
var Member = require('../models/member');

exports.validateRegister = function(req, res, next) {
  var email = req.param('email');
  var password = req.param('password');
  var realname = req.param('realname');

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

  if (typeof realname === 'undefined') {
    return res.json({
      data: '请填写正确姓名',
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

exports.validateIsLogined = function(req, res, next) {
  var m_id = req.cookies.m_id;

  if (typeof m_id === 'undefined') {
    return res.json({
      err: '请先登录',
      code: 20004
    });
  } else {
    next();
  }
};
