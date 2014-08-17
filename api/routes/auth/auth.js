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
      console.log(err);
      res.json({
        data: '登录出错了，请重试！',
        code: 50000
      });
    } else {
      if (member === null) {
        res.json({
          data: '用户不存在',
          code: 20002
        });
      } else {
        password = tools.hashPassword(password);
        if (password === member.password) {
          // Login successfully
          res.cookie("m_id", member.id, {
            signed: true,
            maxAge: 2592000000
          });
          res.json({
            data: {},
            code: 0
          });
        } else {
          // Login failed
          res.json({
            data: '密码错误',
            code: 20003
          });
        }
      }
    }
  });
});

// POST register new user
router.post('/register', validate.validateRegister, function(req, res) {
  var email = req.param('email');
  var password = req.param('password');

  password = tools.hashPassword(password);

  var member = new Member(email, password);

  member.createMember(function (err, member_id) {
    if (err) {
      res.json({
        data: '注册失败',
        code: 50000
      });
    } else {
      res.cookie("m_id", member_id, {
        signed: true,
        maxAge: 2592000000
      });
      res.json({
        code: 0,
        data: {}
      });
    }
  });
});

// DELETE logout
router.delete('/logout', function(req, res) {
  res.clearCookie('m_id');
  res.json({
    data: {},
    code: 0
  });
});

module.exports = router;