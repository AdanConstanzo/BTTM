angular.module('app').controller('UserSettingsPassword',function($scope,UserSvc){
  $scope.updatePassword = function(){
    if(($scope.UserPassword.length>0 && $scope.NewPassword.length>0 && $scope.ConfirmNewPassword.length>0)){
      document.getElementById("user_settings_password_p_success").style.display="none";
      if(($scope.NewPassword != $scope.UserPassword) && ($scope.ConfirmNewPassword == $scope.NewPassword)){
        var dis = document.createAttribute("disabled");
        document.getElementById('user_settings_password_btn_UP').setAttributeNode(dis);
        document.getElementById("user_settings_password_p_matching").style.display="none";
        document.getElementById("user_settings_password_p_confirm").style.display="none";
        UserSvc.changePassword($scope.UserPassword,$scope.NewPassword)
        .then(function(response){
            if(response.status == 200){
              document.getElementById("user_settings_password_p_success").style.display="block";
              document.getElementById("user_settings_password_p_wrong").style.display="none";
              document.getElementById('user_settings_password_btn_UP').removeAttribute("disabled");
            }else if (response.status == 406){
              document.getElementById("user_settings_password_p_wrong").style.display="block";
              document.getElementById("user_settings_password_btn_UP").removeAttribute("disabled");
            }
          })
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
