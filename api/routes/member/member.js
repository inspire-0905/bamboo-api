/*
 * Member routers
 */

var express = require('express');
var router = express.Router();
var validator = require('validator');
var Member = require('../../models/member');
var validate = require('../../utils/validate');
var tools = require('../../utils/tools');


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
router.put("/:member_id", function(req, res) {

});

module.exports = router;