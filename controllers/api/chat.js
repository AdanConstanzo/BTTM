const router = require('express').Router(),
      Message = require('../../models/Message'),
      User   = require('../../models/User');

/*
* basic middlewear to check if there is currently a session.
*/
function authenticate(req, res, next) {
    if (req.session.user) { return next(); }
    return res.sendStatus(401);
}

/*
* our fancy key generator (not fancy at all). need to eithe use a hash in future.
*/
function greaterString(s1,s2){
  if(s1>s2)
    return [s1,s2];
  return [s2,s1];
}

/*
* middlewear to check if other user is self.
*/
function selfCheck(req,res,next){
  if(req.params.otherUser == req.session.user.username)
    return res.sendStatus(404);
  else
    return next();
}

/*
* Api call to retrieve all messages between two different users.
* Requires authentication.
* Checks to see if you are not chatting with yourself.
* Also left a limit as a comment.
* Requires the other user and grabs it by paramaters.
*/
router.get('/chat/:otherUser',authenticate,selfCheck,function(req,res,next){
  var stringParams = greaterString(req.session.user.username,req.params.otherUser);
  var query = stringParams[0]+'-'+stringParams[1];
  Message.find({conversationId:query})
  .sort({date:-1})
  //.limit(15)
  .exec(function(err,conv){
    if(err){return next(err);}
    res.send(conv);
  });
});

/*
* Requires authentication
* creates a conversationId with greaterString function
* automatically post date via model and saves body,author and conversationId
*/
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
