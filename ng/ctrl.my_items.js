angular.module("app").controller("MyItemsCtrl",function($scope,UserSvc,TradingItemSvc){

    UserSvc.getUserAccountInfo()
        .then( function(UserObject) {
            $scope.Users = UserObject;
            TradingItemSvc.getAllUserTradingItems(UserObject.username)
                .then(function (TradingObject) {
                    if(TradingObject[0].status === "OK") {
                        TradingObject.shift();
                        for(x in TradingObject) {
                            if (TradingObject[x].description.length>55) {
                                TradingObject[x].description = TradingObject[x].description.substring(0, 55) + "...";
                            } else {
                                TradingObject[x].description = FillString(TradingObject[x].description,55-TradingObject[x].description.length);
                            }
                        }
                        $scope.UserItems = TradingObject;
                    }
                });
        });


    function FillString(string,numberOf) {
        for (var i = 0; i < numberOf; i++) {
            string += "\xa0"
        }
        return string;
    }

});
