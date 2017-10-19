var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt    = require('jwt-simple');
var fs     = require('fs');
var _      = require('lodash')
var User   = require('../../models/User');
var config = require('../../config');
var multer = require('multer');
var path   = require('path');
var lwip   = require('pajk-lwip');
        /********************/
        /*   Middleware    */
        /********************/

function authenticate(req, res, next) {
    if (req.session.user) { return next() }
    else{ return res.sendStatus(401)}
}

        /********************/
        /*   Multer Code    */
        /********************/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/users/profileImage/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
  }
});

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

var upload = multer({
  storage: storage,
  //limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
});


        /********************/
        /*   API Calls      */
        /********************/


// Updates user's profile image and delets previous image from upload storage.
// Requires authentication.
// IN: file, Session: user,
router.post('/users/profileImage/:id',upload.any(),/*authenticate,*/function(req,res,next){
  var fileDest;
  if(req.files.length>0){
    fileDest = req.files[0].destination
  }else{
    return res.sendStatus(500);
  }
  fileDest = fileDest.replace("uploads/","");
  var publicDir = __dirname+'/../../uploads/';
  var publicPath = publicDir+fileDest+req.files[0].filename;
  var usersImages = {};
  usersImages.path800 = fileDest + '-reSized-800-' + req.files[0].filename;
  usersImages.path400 = fileDest + '-reSized-400-' + req.files[0].filename;
  usersImages.path200 = fileDest + '-reSized-200-' + req.files[0].filename;

  lwip.open(publicPath, function(err, image){
    // check 'err'. use 'imag'.
    image.batch()
    .resize(800,800)
    .writeFile(publicDir+usersImages.path800, function(err){
      if(err) console.log(err)
      image.batch()
      .resize(400,400)
      .writeFile(publicDir+usersImages.path400,function(err){
        if(err) console.log(err);
        image.batch()
        .resize(200,200)
        .writeFile(publicDir+usersImages.path200,function(err){
          if(err) console.log(err);
          User.findByIdAndUpdate({_id:req.params.id},{user_image:usersImages},function(err,docs){
            if(err){return next(err)}
            if(!docs.user_image.hasOwnProperty('default')){
              for(x in docs.user_image)
                fs.unlink(publicDir+docs.user_image[x], (err)=>{ if(err) console.log(err);} );
            }
            // deletes original image.
            fs.unlink(publicPath, (err) => {if(err) console.log(err);});
            res.sendStatus(201);
          });
        })
      })
    })
  });
});

/********* Needs to be fixed *******/
// Checks to see if user has session.
// Requires authentication.
//Session: user, OUT: Json
router.get('/users/session',function(req,res,next){
    if(!req.session.user)
        res.json(false)
    else
        res.json(true)
})

// grabs a single user by auth.username and creates session.user
// IN: headers, Out: 200
router.get('/users',function (req,res,next) {
    if (!req.headers['x-auth']) {
        return res.sendStatus(401)
    }
    // decodes key to access username object
    var auth = jwt.decode(req.headers['x-auth'],config.secret);
    User.findOne( {username: auth.username} ,function (err,user) {
        if(err) {return next(err)}
        req.session.user = user;
        res.sendStatus(200);
    });
});

// returns session's username
// Requires authentication.
//Session: user, OUT: session's username
router.get('/users/user',authenticate,function (req,res,next) {
    return res.json(req.session.user.username)
});

// Destroys all sessions
// Session:ALL , OUT: status 200
router.get('/users/logout',function(req,res,next){
    req.session.destroy();
    return res.status(200).send();
})

//returs 201 or 401 based on user session
router.get('/users/login/session/',function(req,res,next){
  if(req.session.user)
    return res.sendStatus(201);
  else
    return res.sendStatus(401);
})

//checks to see if there is a register session.
router.get('/users/register/session',function(req,res,next){
  if(req.session.register)
    return res.sendStatus(201);
  else
    return res.sendStatus(404);
})

// Destroys register session
//Session: register, OUT: status 200
router.post('/users/register/session/destroy/',function(req,res,next){
  delete req.session.register;
  return res.status(200).send();
})

// creates a new user based with user info and create register session
// Also hash password for DB.
// IN: first_name,last_name,username,email; OUT:status
router.post('/users',function(req,res,next){

    var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        user_image: {default:"images/users/blank_user.png"}
    });
    // makes a hash to encrypt password.
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err) {return next(err)}
        user.password = hash;
        req.session.register = true;
        //saves user to db.
        user.save(function (err) {
            if (err) { return next(err) }
            res.sendStatus(201)
        });
    });
});

// gets current user's information
// Requires authentication.
// IN: params.username, Session: user, OUT:userInfo
router.get('/users/user/accountInfo',authenticate,function(req,res,next){
  User.find({username:req.session.user.username})
  .exec(function(err,username){
      if(err){return next(err)}
      res.send(username[0]);
  });
});

// gets users open info
// IN: params.username; OUT:userInfo
router.get('/users/userOpen/:username',function(req,res,next){
  User.find({username:req.params.username}).exec(function(err,userInfo){
      if(err){return next(err)}
      res.send(userInfo[0]);
  });
});

// Checks for unique username for registering
// IN: params.username; OUT:true/false
router.get('/users/checkUsername/:username',function(req,res,next){
    User.find({username:req.params.username}).exec(function(err,userObject){
        if(userObject[0] == undefined)
            res.send(true);
        else
            res.send(false);
    });
});

// Checks for unique email for registering
// IN: params.email; OUT:true/false
router.get('/users/checkEmail/:email',function(req,res,next){
    User.find({email:req.params.email}).exec(function(err,userObject){
        if(userObject[0] == undefined)
            res.send(true);
        else
            res.send(false);
    });
});

router.post('/users/updateUser/',authenticate,function(req,res,next){
  User.findByIdAndUpdate(
    {_id: req.body._id},
    {
      email: req.body.email,
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      username:req.body.username
    },function(err, docs){
		    if(err) res.json(err);
				else {
				   var user = {};
           user.username = req.body.username;
           user.first_name = req.body.first_name;
           user.last_name = req.body.last_name;
           user.email = req.body.email;
           req.session.user = user;
           res.sendStatus(201);
				}
			 });
})

module.exports = router;
