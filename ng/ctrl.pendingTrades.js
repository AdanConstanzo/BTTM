angular.module('app').controller('PendingTradesCtrl',function($scope,UserSvc,OfferSvc){
    // controller for pending trades
    UserSvc.getUserAccountInfo()
        .then(function (user){
            OfferSvc.GetPendingOffers(user.username)
                .then(function (Offers){
                    console.log(Offers);
                });
        });
});
