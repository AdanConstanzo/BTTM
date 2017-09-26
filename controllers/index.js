var bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();
var session = require("express-session")

router.use(session({secret:"asda0sd-0we1dasj",resave:false,saveUninitialized:true}))
router.use(bodyParser.json());

router.use(function(req, res, next) { //allow cross origin requests
       res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, sid");
       next();
   });

router.get('/',function(req,res){
    res.render('index.html.ejs')
});

router.use('/api',require('./api'));
router.use('/',require('./static'));

module.exports = router;
