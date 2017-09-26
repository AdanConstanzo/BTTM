var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt    = require('jwt-simple');
var config = require('../../config');
var User   = require('../../models/User');

// a login session to check correct credentials.
router.post('/sessions', function (req, res, next) {
    var username = req.body.username;
    User.findOne({username: username})
        .select('password')
        .exec(function (err, user) {
            if(err){return next(err) }
            if(!user){ return res.sendStatus(401) }
            // decrypts the password and then makes sure the token was correct. by jwt
            bcrypt.compare(req.body.password, user.password, function (err, valid) {
                if (err) { return next(err) }
                if (!valid) { return res.sendStatus(401) }
                // encodes signature to create security
                var token = jwt.encode({username: username}, config.secret);
                res.send(token);
            });
        });


});

module.exports = router;
