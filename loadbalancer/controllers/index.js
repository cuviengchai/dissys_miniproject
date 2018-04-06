var express = require('express');
var axios = require('axios');
var router = express.Router();
var ip = require('../config/ip.js');

/* GET home page. */
router.post('/auth', function(req, res, next) {
  axios.post(ip.primaryBacked + '/auth', {name: req.body,name})
  .then(function(response) {
    console.log(response);
    res.send(response.data);
  })
  .catch(function(err) {
    console.error(err);
    res.send('ERROR');
  })
});

module.exports = router;