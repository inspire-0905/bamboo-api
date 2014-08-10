/*
 * Index handler
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var memberId = req.cookies.m_id;
  if (typeof memberId === 'undefined') {
    res.json({
      err: 0,
      data: {}
    });
  } else {
    res.json({
      err: 0,
      data: {}
    });
  }
});

module.exports = router;