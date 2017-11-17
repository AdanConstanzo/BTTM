angular.module("app").service("ReservationSvc", function ($http,OfferSvc) {
    var svc = this;
    svc.makeReservation = function (OfferObject) {
        return $http.post("/api/reservation/make/", OfferObject)
            .then(function (OfferCreated) {
                var offerCreated = OfferCreated.data;
                offerCreated.shift();
                var reservationObject = {};
                reservationObject.offerId = offerCreated[0].offerId;
                reservationObject.TransactionPendingId = offerCreated[0]._id;
                reservationObject.offerStatus = "accepted"
                return OfferSvc.setReservation(reservationObject);
            });
    }

    svc.declineReservation = function(){

    }

    svc.getReservation = function (id) {
        return $http.get("/api/transPend/getTransPend/findOne/"+id)
            .then(function (Reservation){
                return Reservation.data;
            })
    }
});
