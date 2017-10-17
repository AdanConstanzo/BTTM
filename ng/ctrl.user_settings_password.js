angular.module('app').controller('UserSettingsPassword',function($scope,UserSvc){
  $scope.updatePassword = function(){
    if(($scope.UserPassword.length>0 && $scope.NewPassword.length>0 && $scope.ConfirmNewPassword.length>0)){
      if(($scope.NewPassword != $scope.UserPassword) && ($scope.ConfirmNewPassword == $scope.NewPassword)){
        document.getElementById("user_settings_password_p_matching").style.display="none";
        document.getElementById("user_settings_password_p_confirm").style.display="none";
        alert('do call here')
      }else if ($scope.NewPassword == $scope.UserPassword){
        document.getElementById("user_settings_password_p_matching").style.display="block";
        console.log('pop');
      }else if($scope.ConfirmNewPassword != $scope.NewPassword){
        document.getElementById("user_settings_password_p_confirm").style.display="block";
        console.log('hit');
      }
    }
  }
});
