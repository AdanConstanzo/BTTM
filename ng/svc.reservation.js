angular.module("app").service("ReservationSvc", function ($http,OfferSvc) {
    var svc = this;
    svc.makeReservation = function (OfferObject) {
        return $http.post("/api/reservation/make/", OfferObject)
            .then(function (OfferCreated) {
                OfferCreated.shift();
                var reservationObject = {};
                reservationObject.offerId = OfferCreated[0].offerId;
                reservationObject.TransactionPendingId = OfferCreated[0]._id;
                reservationObject.offerStatus = "accepted"
                return OfferSvc.setReservation(reservationObject);
            });
    }

    svc.declineReservation = function(){

    }
});
