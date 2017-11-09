var router = require('express').Router();
var User   = require('../../models/User');
var TransactionCom  = require('../../models/TransactionCompleted');


//get and post for transactions
router.post('/transCom/addTrans',function(req,res, next){
  var tempTransCom = new TransactionCom({
    client_aID: req.body.client_aID,
    client_bID:  req.body.client_bID,
    itemA:  req.body.itemA,
    itemB:  req.body.itemB,
    reviewA:  req.body.reviewA,
    reviewB:  req.body.reviewB
  });
  tempTransCom.save(function(err,prog){
    if(err){return next(err)}
    res.json({status:"success",code:201});
  });
});


// returns all items of the user
router.get("/transCom/getTransCom/findOne/:id",function(req,res,next){

  TransactionCom.findOne({_id: id})
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
router.get("/transCom/getTransCom/:client_aID",function(req,res,next){
  var client = req.params.client_aID;
  TransactionCom.find({"client_aID": client})
  .exec(function(err,user){
    if(err) {
      res.json({"error": "transactionsCompleted error"})
      return next(err)

    }

      if(user.length == 0){
        console.log("hi bob")
        res.sendStatus(401);
        return;
      }

    res.send(user);
  })
})

module.exports = router;
