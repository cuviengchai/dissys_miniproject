var express = require('express');
var axios = require('axios');
var router = express.Router();
var ip = require('../config/ip.js');

/* GET home page. */
router.post('/auth', function(req, res, next) {
  // ACTIVE PRIMARY BACKEND
  axios.post(ip.primaryBackend + '/auth', {name: req.body.name})
  .then(function(response) {
    console.log("primary backend active!");
    res.send(response.data);
  })
  .catch(function(err) {
    console.error(err);

    // ACTIVE SECONDARY BACKEND
    axios.post(ip.secondaryBackend + '/auth', { name: req.body.name })
    .then(function (response) {
      console.log("secondary backend active!");
      res.send(response.data);
    })
    .catach(function(err) {
      console.error(err);
      res.send('ERROR');
    });
  });
});

module.exports = router;