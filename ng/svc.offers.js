angular.module("app").service("OfferSvc", function ($http) {
    var svc = this;

    svc.GetAllOffersByUserName = function (Username) {
        return $http.get("/api/offers/username/"+Username)
            .then(function (Offers) {
                return Offers.data;
            });
    }

    svc.GetOneOfferById = function (_id) {
        return $http.get("/api/offers/id/"+_id)
            .then(function (Offer) {
                return Offer.data;
            });
    }

    svc.makeOffer = function (OfferObject) {
        return $http.post("/api/offers/make/", OfferObject)
            .then(function (OfferCreated) {
                return OfferCreated.data;
            });
    }

    svc.setReservation = function(ReservationObject) {
        return $http.put("/api/offers/addTransactionPending/", ReservationObject)
            .then(function (response){
                return response;
            })
    }

    svc.GetPendingOffers = function(Username){
        return $http.get("/api/offers/pending/username/"+Username)
            .then(function (Offers) {
                return Offers.data;
            })
    }

});
