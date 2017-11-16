const router = require('express').Router(),
TransactionPending = require("../../models/TransactionPending");

router.post("/reservation/make/", function(req,res,next) {
    var reservation = new TransactionPending({
        offerId: req.body.offerId,
        location: req.body.location,
        date: req.body.date,
    });
    reservation.save(function (err, doc) {
        if (err) {
            res.send([{"status":"ERROR","details":err}]);
        } else {
            res.send([{"status":"OK"},doc]);
        }
    });
});

module.exports = router;
