var router = require('express').Router();
var TradeObjs = require('../../models/TradingObject');



router.get("/itemSearch/search/:name",function(req,res,next){
  var search = req.params.name;
  var counter = 0;
  var temp;
  console.log("HELLO");
  TradeObjs.find()
    .exec(function(err,arr){
        var sendThis = [];
        for(x in arr){
          temp = arr[x].name;
          if(temp.includes(search)){
            sendThis.push(arr[x]);
            counter++;
          }
        }
        res.send(sendThis);
    });
});

module.exports = router;
