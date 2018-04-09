var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Group = require('../models/group.js');
var Message = require('../models/message.js');
var Join = require('../models/join.js');

/* GET home page. */
router.post('/auth', function(req, res, next) {
  console.log(req.body.name);
  // console.log("chicke");
  var query = {name:req.body.name};
  var obj;
  User.find(query, function(err, users) {
    if(err) throw err
    if(users.length == 0){
      var user_model = new User(query);
      user_model.save(function (err){
        if(err) {
          console.log("db save unsuccessful.")
        }
        var query2 = User.findOne(query);
      query2.exec(function(err, theUser){
        if(err) throw err;
        else {
          obj = {"id":theUser._id };
          res.send(obj);
        }
      });
      });
    }
    else {
      obj = { "id": users[0]._id};
      return res.send(obj);
    }

  });
});

router.get('/getAllGroup', function(req, res) {
  Group.find({}, function(err,groups){
    if(err) throw err;
    else {
      return res.send(groups);      
    }
  });
  // console.log(query);
});

router.post('/createGroup', function(req, res){
  var query = {name:req.body.name};
  Group.find(query, function(err,groups){
      if(err) {
        console.log("group finding error");
      }
      if(groups.length == 0){
        var group_model = new Group(query);
        group_model.save(function(err, group){
            if(err) throw err;
            var join_model = new Join({uid:req.body.uid, gid:group.id, read_at:0});
            join_model.save(function(err){
              if(err) throw err;
              console.log("GROUP CREATED BY AN UID");
              return res.send("GROUP CREATED");
            })
        })
      }
      else{
          return res.send("GROUP EXISTED");
      }
  })
});

router.post('/joinGroup', function(req, res){
  var query = {_id:req.body.gid};
  Group.find(query, function(err,groups){
      if(err) throw err
      if(groups.length == 0){
        console.log("NOT FOUND GROUP");
        return res.send("NOT FOUND");
      }
      else{
        console.log("FOUND GROUP");
        var join_model = new Join({uid:req.body.uid, gid:req.body.gid, read_at:0});
        join_model.save(function(err){
            if(err) throw err;
            else
              return res.send("EXISTED");
        })
      }
  })
});

router.post('/sendMessage', function(req,res){
  var Iuid = req.body.uid;
  var Igid = req.body.gid;
  var Icontent = req.body.content;
  var query = Group.findOne({gid:Igid});
  query.select('gid');
  query.exec(function(err, group){
    if(err) throw err;
    else{
      var message_model = new Message({uid:Iuid, gid:Igid, content:Icontent, send_at:Date.now()});
      message_model.save(function(err){
        if(err) {
          res.send("ERROR SAVING MESSAGE");
          throw err
        }
        res.send("MESSAGE SAVED")
      })
    }
  })
});

router.get('/getUserInfo', function(req,res){
  Join.find({uid:req.query.uid}, function(err, joins){
    var result = [];
    joins.map((join, index) => {
      Group.find({_id:join.gid}, function(err, groups){
        result.push(groups[0]);
        if(index === joins.length - 1) {
          res.send(result)
        }
      })
    });
  });
});

module.exports = router;
