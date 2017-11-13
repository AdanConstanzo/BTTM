const router = require('express').Router(),
Offer = require("../../models/Offer");

/*
User_offer_username: {type: String, required: true},
User_other_username: {type: String, required: true},
User_offer_items: [String],
User_other_items: [String]
*/

// finds all offers done by a user.
router.get("/offers/username/:username", function(req, res, next) {
    Offer.find({$or:[{User_offer_username: req.params.username},{User_other_username: req.params.username}]})
        .exec(function (err,offers) {
            res.send(offers);
        });
});

// finds one offer by id
router.get("/offers/id/:_id", function (req, res, next) {
    Offer.findOne({_id:req.params._id})
        .exec(function (err,offer) {
            res.send(offer);
        });
});

// creates an offer.
router.post("/offers/make/", function (req, res, next) {
    var offer = new Offer({
        User_offer_username: req.body.User_offer_username,
        User_other_username: req.body.User_other_username,
        User_offer_items: req.body.User_offer_items,
        User_other_items: req.body.User_other_items
    });
    offer.save(function (err, doc) {
        if (err) {
            res.send([{"status":"ERROR","details":err}]);
        } else {
            res.send([{"status":"OK"},doc]);
        }
    })
});

module.exports = router;
