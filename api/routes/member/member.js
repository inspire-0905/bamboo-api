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
    res.json(400, {
      'err': '请填写正确的邮箱',
      'code': 400
    });
  } else {
    Member.isEmailExisted(email, function(err, isExisted) {
      if (err) {
        console.error(err);
        res.json(500, {
          'err': '服务器正在撰写文章',
          'code': 500
        });
      } else {
        if (isExisted) {
          res.json(400, {
            'err': '邮箱已经被注册，请更换邮箱',
            'code': 400
          });
        } else {
          res.json(200, {
            'err': '',
            'code': 0
          });
        }
      }
    });
  }
});


// PUT update member info
router.param('member_id', /^\d+$/);
router.put("/:member_id", function(req, res) {
  var headline = req.param('headline');
  var nickname = req.param('nickname');
  var member_id = req.params.member_id;

  var updateValues = {};

  if (typeof headline != 'undefined' && headline.length !== 0) {
    updateValues.headline = headline;
  }

  if (typeof nickname != 'undefined' && nickname.length !== 0) {
    updateValues.nickname = nickname;
  }

  if (Object.keys(updateValues).length !== 0) {
    // update value
    Member.updateMember(member_id, updateValues, function(err, rst) {
      if (err) {
        console.error(err);
        res.json(500, {
          err: '更新用户信息失败了，请重试！',
          code: 50000
        });
      } else {
        res.json({
          err: '',
          code: 0
        });
      }
    });
  } else {
    // return immediately
    res.json({
      err: '',
      code: 0
    });
  }
});



module.exports = router;