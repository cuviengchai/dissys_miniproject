var express = require('express');
var axios = require('axios');
var router = express.Router();
var ip = require('../config/ip.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get(ip.primaryBacked + '/')
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
