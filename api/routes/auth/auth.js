/*
 * Member auth related
 */

var express = require('express');
var router = express.Router();

var Member = require('../../models/member');
var tools = require('../../utils/tools');
var validate = require('../../utils/validate');

router.post('/login', function(req, res) {
  var email = req.param('email');
  var password = req.param('password');

  Member.getMemberByEmail(email, function(err, member) {
    if (err) {
      res.json(500, {
        err: '登录出错了，请重试！',
        code: 50000
      });
    } else {
      if (member === null) {
        res.json(400, {
          err: '用户不存在',
          code: 20002
        });
      } else {
        password = tools.hashPassword(password);
        if (password === member.password) {
          // Login successfully
          req.session.uid = member.id;
          res.json({
            err: '',
            code: 0
          });
        } else {
          // Login failed
          res.json(400, {
            err: '密码错误',
            code: 20003
          });
        }
      }
    }
  });
});

// POST register new user
router.post("/register", validate.validateRegister, function(req, res) {
  var email = req.param('email');
  var password = req.param('password');
  var realname = req.param('realname');

  password = tools.hashPassword(password);

  var member = new Member(email, password, realname);

  member.createMember(function (err, member_id) {
    if (err) {
      res.json(500, {
        'err': '注册失败',
        'code': 50000
      });
    } else {
      res.json({
        'err': '',
        'code': 0,
        'member_id': member_id
      });
    }
  });
});

module.exports = router;