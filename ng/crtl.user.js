angular.module('app').controller('UserCtrl', function ($scope, UserSvc) {
    var h1_header = document.getElementById("user_h1_header");
    UserSvc.getUserOpenInfo("b").then(function(userInf){
        console.log(userInf);
        $scope.user_name = userInf.first_name + " "+userInf.last_name
        //document.getElementById("user_name").innerHTML = userInf.first_name;
        $scope.user_trading_items = ["img1","img2"];
    });

   
});
    