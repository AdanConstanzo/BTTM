var router = require('express').Router();
var fs     = require('fs');
var User   = require('../../models/User');
var Trade  = require('../../models/TradingObject');
var config = require('../../config');
var multer = require('multer');

router.post('/trading/addItem',function(req,res, next){
  var tempTrade = new Trade({
    name:req.body.name,
    description:req.body.description,
    image:["apple","pen"],
    user:req.body.user

  tempTrade.save(function(err,prog){
    if(err){return next(err)}
    res.json({status:"success",code:201});
  })
});
})

router.get("/trading/getItems/:username",function(req,res,next){
  var username = req.params.username;
  Trade.find({"user":username})
  .exec(function(err,user){
    if(err) {return next(err)}
    if(user.length == 0){
      console.log("hi bob")
      res.sendStatus(401);
      return;
    }
    res.send(user);
  })
})

router.delete("/trading/deleteItems/",function(req,res, next){

})
/*
need .delete method to delete items
need .put method to edit items
*/
/*  User.findOne({"username":username})
  .exec(function(err,user){
    if(err){
      res.send(err);
      return;
    }
    res.send(user);
  })
  */

module.exports = router;
