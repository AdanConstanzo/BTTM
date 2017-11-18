const router = require('express').Router();
var MessageList = require("../../models/MessageList");

/*
var schema = new Schema({
  body: { type: String, required: true },
  sender: { type: String,required:true},
  reciever: {type: String, required: true},
  link: {type: String, required: true},
  view: {type: Boolean, required: true}
});

*/
router.get("/MessageList/reciever/:reciever-:sender", function(req,res,next){
    MessageList.findOne({"reciever":req.params.reciever,"sender":req.params.sender})
        .exec(function(err,MessageList){
            res.send(MessageList);
        })
})

router.post("/MessageList/", function(req, res, next) {

    MessageList.findOne({"reciever":req.body.reciever,"sender":req.body.sender})
        .exec(function(err,Message){
            if(Message) {
                MessageList.findByIdAndUpdate({"_id":Message._id},{
                    body: req.body.body,
                    sender: req.body.sender,
                    reciever: req.body.reciever,
                    view: req.body.view
                },function(err,docs){
                      if(err){return next(err)}
                      res.send(docs)
                });
            } else {
                    var messageList = new MessageList({
                        body: req.body.body,
                        sender: req.body.sender,
                        reciever: req.body.reciever,
                        link: req.body.link,
                        view: req.body.view
                    });
                    messageList.save(function (err, doc) {
                        res.send(doc);
                    });
            }
        });
});

router.get("/MessageList/reciever/:reciever", function(req,res,next){
    MessageList.find({"reciever":req.params.reciever})
        .exec(function(err,message){
            res.send(message);
        })
})

module.exports = router;
