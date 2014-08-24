/*
 * Member auth related
 */

var express = require('express');
var router = express.Router();

var Member = require('../../models/member');
var AccessToken = require('../../models/access_token');
var tools = require('../../utils/tools');
var validate = require('../../utils/validate');

/*
 * HTTP method POST
 * Login api
 */
router.post('/login', validate.validateIsNotLogined, function(req, res) {
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
          // return access_token
          var at = new AccessToken(member.id);
          at.save(function(err, rst) {
            if (err) {
              res.json({
                data: '登录出错了，请重试！',
                code: 50000
              });
            } else {
              res.json({
                data: rst,
                code: 0
              });
            }
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

/*
 * HTTP method POST
 * Register api
 */
router.post('/register', validate.validateIsNotLogined,
  validate.validateRegister, function(req, res) {
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
      var at = new AccessToken(member_id);
      at.save(function(err, rst) {
        if (err) {
          res.json({
            data: '注册失败',
            code: 50000
          });
        } else {
          res.json({
            code: 0,
            data: rst
          });
        }
      });
    }
  });
});


/*
 * HTTP method DELETE
 * Logout api
 */
router.delete('/logout', validate.validateIsLogined, function(req, res) {
  var authorization = req.headers['Authorization'];
  var access_token = authorization.split(' ')[1];

  AccessToken.revoke(access_token, function(err, rst) {
    if (err) {
      res.json({
        data: '注销失败了',
        code: 50000
      });
    } else {
      res.json({
        data: {},
        code: 0
      });
    }
  });
});

module.exports = router;