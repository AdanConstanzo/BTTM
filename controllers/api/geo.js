const router = require('express').Router();
const geocoder = require('geocoder');

router.get("/geo/:lat"+"-"+":lng", function(req,res,next) {
    geocoder.reverseGeocode( req.params.lat, req.params.lng, function ( err, data ) {
        if(err) {
            res.json({"status":"ERROR"});
            return;
        }
        if(data.status === "OK") {
            var geoObj = {};
            geoObj.status = "OK";
            geoObj.lat = req.params.lat;
            geoObj.lng = req.params.lng;
            for(x in data.results[0].address_components) {
                if (data.results[0].address_components[x].types[0] === "administrative_area_level_1") {
                    geoObj.state = data.results[0].address_components[x].long_name;
                } else if (data.results[0].address_components[x].types[0] === "locality") {
                    geoObj.city = data.results[0].address_components[x].long_name
                }
            }
            res.send(geoObj);
        } else {
            res.send({"status":"ERROR"});
        }
    });
})

module.exports = router;
