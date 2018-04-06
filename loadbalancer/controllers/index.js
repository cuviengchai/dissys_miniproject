var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get('http://localhost:4000')
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
