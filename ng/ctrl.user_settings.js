angular.module('app').controller('UserSettings',function($scope,UserSvc){
  // Checks user session //
  var UserSvcObj = {};
  UserSvcObj.formItems = {};
  UserSvcObj.formItems.email = document.getElementById("user_settings_input_email");
  UserSvcObj.formItems.first_name = document.getElementById("user_settings_input_first");
  UserSvcObj.formItems.last_name  = document.getElementById("user_settings_input_last");
  UserSvcObj.formItems.username = document.getElementById("user_settings_input_username");
  UserSvcObj.fieldset = document.getElementById("user_settings_fieldSet");
  // returns 201 or 401
  UserSvc.getLogInSession();

  // updates place holders.

  UserSvc.getUserAccountInfo().then(function(response){
    for(x in UserSvcObj.formItems){
      UserSvcObj.formItems[x].setAttribute("value",response[x]);
    }
    UserSvcObj.fieldset.removeAttribute("disabled");
    //removeAttribute
  });

  $scope.ConfirmChanges = function(){
    console.log("wasup bby");
  }

});
