angular.module('app').controller('ApplicationCtrl', function ($scope,UserSvc,$location) {

    $scope.logout = function(){
        UserSvc.logout();
        $scope.currentUser = null;
        localStorage.clear();
        $location.path("/");
        window.location.reload();
    };

    UserSvc.hasSession().then(function(response){
        console.log(response);
        if(response){
          UserSvc.getUserAccountInfo().then(function(response){
              $scope.currentUser = response
              console.log($scope.currentUser);
          });
        }
    });

});
