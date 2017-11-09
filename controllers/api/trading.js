var router = require('express').Router();
var fs     = require('fs');
var User   = require('../../models/User');
var Trade  = require('../../models/TradingObject');
var config = require('../../config');
var multer = require('multer');
var path   = require('path');
const jimp = require("jimp");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/users/items/')
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

//creates a new item

router.post('/trading/addItem',function(req,res, next){
    console.log(req.body);
  var tempTrade = new Trade({
    name:req.body.name,
    description:req.body.description,
    image: {image:"nope"},
    user:req.body.user
  });
  tempTrade.save(function(err,prog){
    if(err){return next(err)}
    res.json({status:"success",code:201,_id:prog._id});
  });
});

router.put("/trading/updateImage/:_id",upload.any(), function(req,res,next) {

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

    jimp.read(publicPath, function (err, image) {
        if (err) {throw err;}
        image.resize(800,800)
            .write(publicDir+usersImages.path800,function (err, image){
                image.resize(400,400)
                .write(publicDir+usersImages.path400,function(err,image){
                    image.resize(200,200)
                    .write(publicDir+usersImages.path200,function(err,image){
                        Trade.findByIdAndUpdate({_id:req.params._id},{image:usersImages},function(err,docs){
                          if(err){return next(err)}
                          // deletes original image.
                          fs.unlink(publicPath, (err) => {if(err) console.log(err);});
                          res.json({"created":201,"_id":req.params._id});
                        });
                    });
                });
            });
    });
})

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
/*

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
