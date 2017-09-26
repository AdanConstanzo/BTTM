angular.module('app').controller('ApplicationCtrl', function ($scope,UserSvc,$location) {

    $scope.logout = function(){
        UserSvc.logout();
        $scope.currentUser = null;
        localStorage.clear();
        $location.path("/");
        window.location.reload();
    };

    UserSvc.hasSession().then(function(response){
        if(response){
            UserSvc.checkLogIn().then(function(response){
                UserSvc.getUserPublicInfo(response).then(function(response){
                    $scope.currentUser = response
                });
            });
        }
    });

});
