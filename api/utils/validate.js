/*
 * Validation tools
 */

var validator = require('validator');
var Member = require('../models/member');

exports.validateRegister = function(req, res, next) {
  var email = req.param('email');
  var password = req.param('password');
  var realname = req.param('realname')

  console.log(req.body);
  var isEmail = validator.isEmail(email);


  if (!isEmail) {
    return res.json(400, {
      err: '请填写正确的邮箱',
      code: 20001
    });
  }

  if (password.length < 6 || password > 16) {
    return res.json(400, {
      err: '密码长度需在6-16个字符',
      code: 20001
    });
  }

  if (typeof realname === 'undefined') {
    return res.json(400, {
      err: '请填写正确姓名',
      code: 20001
    });
  } 

  Member.isEmailExisted(email, function(err, isExisted) {
    if (err) {
      console.error(err);
      return res.json(500, {
        err: 服务器正在撰写文章,
        code: 500
      });
    } else {
      if (isExisted) {
        return res.json(400, {
          err: '邮箱已经被注册，请更换邮箱',
          code: 400
        });
      } else {
        next();
      }
    }
  });
};