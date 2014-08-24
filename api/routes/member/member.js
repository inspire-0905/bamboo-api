/*
 * Member routers
 */

var express = require('express');
var router = express.Router();
var validator = require('validator');
var Member = require('../../models/member');
var validate = require('../../utils/validate');
var tools = require('../../utils/tools');

router.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});

// GET whether the email has been used
router.get("/check_email", function(req, res) {
  var email = req.param('email');
  var isEmail = validator.isEmail(email);

  if (!isEmail) {
    res.json({
      data: '请填写正确的邮箱',
      code: 20001
    });
  } else {
    Member.isEmailExisted(email, function(err, isExisted) {
      if (err) {
        console.error(err);
        res.json({
          data: '服务器正在撰写文章',
          code: 50000
        });
      } else {
        if (isExisted) {
          res.json({
            data: '邮箱已经被注册，请更换邮箱',
            code: 20001
          });
        } else {
          res.json({
            data: {},
            code: 0
          });
        }
      }
    });
  }
});

// PUT update member's profile
router.put("/profile", validate.validateIsLogined,
  validate.validateUpdateProfile, function(req, res) {
  var nickname = req.param('nickname');
  var motto = req.param('motto');
  var introduction = req.param('introduction');
  var douban = req.param('douban');
  var weibo = req.param('weibo');
  var zhihu = req.param('zhihu');
  var github = req.param('github');
  var dribbble = req.param('dribbble');
  var pixiv = req.param('pixiv');
  var personSite = req.param('person_site');
  var Authorization = req.headers['Authorization'];
  var accssToken = Authorization.split(' ')[1];

  AccessToken.getMemberIdByAccessToken(accessToken, function(err, memberId) {
    if (err) {
      res.json({
        err: 50000,
        data: err,
      });
    } else {
      if (memberId === null) {
        res.json({
          err: 20002,
          data: '用户不存在'
        });
      } else {
        var updatedValues = {};

        if (typeof nickname !== 'undefined') {
          updatedValues.nickname = nickname;
        }

        if (typeof motto !== 'undefined') {
          updatedValues.motto = motto;
        }

        if (typeof introduction !== 'undefined') {
          updatedValues.introduction = introduction;
        }

        if (typeof douban !== 'undefined') {
          updatedValues.douban = douban;
        }

        if (typeof zhihu !== 'undefined') {
          updatedValues.zhihu = zhihu;
        }

        if (typeof github !== 'undefined') {
          updatedValues.github = github;
        }

        if (typeof dribbble !== 'undefined') {
          updatedValues.dribbble = dribbble;
        }

        if (typeof pixiv !== 'undefined') {
          updatedValues.pixiv = pixiv;
        }

        if (typeof personSite !== 'undefined') {
          updatedValues.site = personSite;
        }

        if (Object.keys(updatedValues).length !== 0) {
          Member.updateMember(member_id, updatedValues, function(err, rst) {
            if (err) {
              console.error(err);
              res.json({
                data: '更新用户信息失败了，请重试！',
                code: 50000
              });
            } else {
              res.json({
                data: updatedValues,
                code: 0
              });
            }
          });
        } else {
          res.json({
            data: {},
            code: 0
          });
        }
      }
    }
  });
});

/*
 * HTTP method PUT
 * Change the user's password
 */
router.put('/password', validate.validateIsLogined,
  validate.validateUpdatePassword, function(req, res) {
  var newPassword = req.param('new_password');
  var Authorization = req.headers['Authorization'];
  var accessToken = Authorization.split(' ')[1];

  newPassword = tools.hashPassword(newPassword);

  AccessToken.getMemberIdByAccessToken(accessToken, function(err, memberId) {
    if (err) {
      res.json({
        data: '服务器正在撰写文章',
        err: 50000
      });
    } else {
      var updatedValues = {};
      updatedValues.password = newPassword;
      Memeber.updateMember(memberId, updatedValues, function(err, rst) {
        if (err) {
          res.json({
            data: '服务器正在撰写文章',
            err: 50000
          });
        } else {
          res.json({
            data: '更新成功',
            err: 0
          });
        }
      });
    }
  });
});


module.exports = router;