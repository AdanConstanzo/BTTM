angular.module('app').controller('UserCtrl',function($scope,UserSvc){
  var h1 = document.getElementById("h1");
  UserSvc.getUserAccountInfo().then(function(data){
    $scope.User = data.username;
    $scope.userImage = data.user_image;
  })
});
