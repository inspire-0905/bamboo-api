/*
 * Index handler
 */

var express = require('express');
var feed = require('../../models/feed');
var router = express.Router();

router.get('/feeds', function(req, res) {
  var memberId = req.signedCookies.m_id;
  if (typeof memberId === 'undefined') {
    res.json({
      err: 0,
      data: {}
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
});

module.exports = router;