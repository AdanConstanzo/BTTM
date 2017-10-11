const router = require('express').Router(),
      Message = require('../../models/Message'),
      User   = require('../../models/User');

function authenticate(req, res, next) {
    if (req.session.user) { return next(); }
    return res.sendStatus(401);
}
function greaterString(s1,s2){
  if(s1>s2)
    return [s1,s2];
  return [s2,s1];
}
router.get('/chat/:otherUser',authenticate,function(req,res,next){
  var stringParams = greaterString(req.session.user.username,req.params.otherUser);
  var query = stringParams[0]+'-'+stringParams[1];
  Message.find({conversationId:query})
  .sort({date:-1})
  .limit(10)
  .exec(function(err,conv){
    if(err){return next(err);}
    res.send(conv);
  });
});

router.post('/chat',authenticate,function(req,res,next){
  var currentUser = req.session.user.username;
  var stringParams = greaterString(currentUser,req.body.otherUser);
  const message = new Message({
    conversationId: stringParams[0]+"-"+stringParams[1],
    body: req.body.body,
    author:currentUser
  });

  message.save(function(err){
    if(err){res.send({Error:err});return next(err);}
    res.sendStatus(200);
  });

});

module.exports = router;
