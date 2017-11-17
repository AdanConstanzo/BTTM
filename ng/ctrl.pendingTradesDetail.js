angular.module('app').controller('PendingTradesDetailsCtrl',function($scope,$routeParams, UserSvc, OfferSvc, ReservationSvc, TradingItemSvc){
    $scope.User = {};
    $scope.UserImage = [];
    $scope.OtherImage = [];
    UserSvc.getUserAccountInfo()
        .then(function(User){
            $scope.User = User;
            ReservationSvc.getReservation($routeParams.id)
                .then(function (reservation){
                    $scope.Reservation = reservation;
                    $("#areapicker").locationpicker({
                        location: reservation.location,
                        radius: 200,
                        zoom: 17,
                        enableAutocomplete: true
                    });
                    var offerId = reservation.offerId;
                    grabOffer(offerId);
                });
        })

    function grabOffer(offerId){
        OfferSvc.GetOneOfferById(offerId)
            .then(function (offer){
                proccessOffer(offer);
            });
    }

    function proccessOffer(offer){
        console.log(offer);
        if(offer.User_offer_username === $scope.User.username){
            for(x in offer.User_offer_items){
                TradingItemSvc.getItemById(offer.User_offer_items[x])
                    .then(function(Item){
                        $scope.UserImage.push(Item);
                    })
            }
            for (x in offer.User_other_items) {
                TradingItemSvc.getItemById(offer.User_offer_items[x])
                    .then(function(Item){
                        $scope.OtherImage.push(Item);
                    })
            }
        } else {
            for(x in offer.User_other_items){
                //offer.User_offer_username
                TradingItemSvc.getItemById(offer.User_other_items[x])
                    .then(function(Item){
                        $scope.UserImage.push(Item);
                        console.log($scope.UserImage);
                    })
            }

            for (x in offer.User_other_items) {
                TradingItemSvc.getItemById(offer.User_offer_items[x])
                    .then(function(Item){
                        $scope.OtherImage.push(Item);
                        console.log($scope.OtherImage[0]._id);
                    })
            }
        }
    }
}); // end of controller
