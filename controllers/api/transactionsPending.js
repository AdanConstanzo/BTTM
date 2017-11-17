var router = require('express').Router();
var User   = require('../../models/User');
var TransactionPend  = require('../../models/TransactionPending');


//get and post for transactions
router.post('/transPend/addTrans/',function(req,res, next){
  var tempTransPend = new TransactionPend({
    client_aID: req.body.client_aID,
    client_bID:  req.body.client_bID,
    itemA:  req.body.itemA,
    itemB:  req.body.itemB,
    location:  req.body.location,
    dateOf:  req.body.dateOf
  });
  tempTransPend.save(function(err,prog){
    if(err){return next(err)}
    res.json({status:"success",code:201});
  });
});


// returns all items of the user
router.get("/transPend/getTransPend/findOne/:id",function(req,res,next){

  TransactionPend.findOne({_id: req.params.id})
  .exec(function(err,user){
    if(err) {
      console.log("err in func");
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
router.get("/transPend/getTransPend/:client_aID",function(req,res,next){
  var client = req.params.client_aID;
  TransactionPend.find({"client_aID": client})
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
