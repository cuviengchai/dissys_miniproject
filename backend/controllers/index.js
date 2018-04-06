var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    res.send(users);
  });
});

module.exports = router;
