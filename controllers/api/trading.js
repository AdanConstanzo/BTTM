var router = require('express').Router();
var fs     = require('fs');
var User   = require('../../models/User');
var Trade  = require('../../models/TradingObject');
var config = require('../../config');
var multer = require('multer');

//creates a new item

router.post('/trading/addItem',function(req,res, next){
  var tempTrade = new Trade({
    name:req.body.name,
    description:req.body.description,
    image:["apple","pen"],
    user:req.body.user
  });
  tempTrade.save(function(err,prog){
    if(err){return next(err)}
    res.json({status:"success",code:201});
  });
});


// returns all items of the user
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

router.get("/trading/getItems/findOne/:id",function(req,res,next){
  var id = req.params.id;
  Trade.findOne({_id: id})
  .exec(function(err,user){
    if(err) {
      res.json({"error": "oh no."})
      return;
    }
    if(!user){
      res.json({"message":"no user"})
      return;
    }
    res.send(user);
  })
})

// deletes an item by id
router.delete("/trading/deleteItems/:id",function(req,res, next){
  var id = req.params.id;
  Trade.remove({_id: id},function(err,result){
    if(err){
      return res.json({error:"Missing sometig"})
    }
    res.sendStatus(200);
  });
});

// edits an item based on id
router.put("/trading/editItems/:id",function(req,res, next){
  var id = req.params.id;
  Trade.findByIdAndUpdate({_id : id},{
      name:req.body.name,
      description:req.body.description,
      image:["apple","pen"],
    },function(err,docs){
      if(err){return next(err)}
      res.sendStatus(200);
    });
});

module.exports = router;
