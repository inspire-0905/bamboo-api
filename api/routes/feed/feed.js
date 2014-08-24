/*
 * Index handler
 */

var express = require('express');
var feed = require('../../models/feed');
var AccessToken = require('../../models/access_token');
var validate = require('../../utils/validate');
var router = express.Router();

router.get('/feeds', validate.validateIsLogined, function(req, res) {
  var Authoriztion = req.headers['Authorization'];
  var accessToken = Authorization.split(' ')[1];

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
        feed.getIndexFeeds(memberId, function(err, data) {
          if (err) {
            res.json({
              err: 50000,
              data: err,
            });
          } else {
            res.json({
              err: 0,
              data: data
            });
          }
        });
      }
    }
  });
});

module.exports = router;