var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET home page. */
router.get('/auth', function(req, res, next) {
  console.log(req.query.name);
  // console.log("chicke");
  var query = {name:req.query.name};
  User.find(query, function(err, users) {
    if(err) throw err
    if(users.length == 0){
      var user_model = new User(query);
      user_model.save(function (err){
        if(err) {
          console.log("db save unsuccessful.")
        }
        
      });
      return res.send('CREATED');
    }
    else return res.send('EXISTED');

  });
});

module.exports = router;
