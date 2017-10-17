angular.module('app').controller('UserSettings',function($scope,UserSvc){
  // Checks user session //
  var UserSvcObj = {};
  UserSvcObj.formItems = {};
  UserSvcObj.errorFormItems = {};
  UserSvcObj.formItems.email = document.getElementById("user_settings_input_email");
  UserSvcObj.formItems.first_name = document.getElementById("user_settings_input_first");
  UserSvcObj.formItems.last_name  = document.getElementById("user_settings_input_last");
  UserSvcObj.formItems.username = document.getElementById("user_settings_input_username");
  UserSvcObj.errorFormItems.username = document.getElementById("user_settings_check_username");
  UserSvcObj.errorFormItems.email = document.getElementById("user_settings_check_email");
  UserSvcObj.user_image = document.getElementById("user_settings_image");
  UserSvcObj.fieldset = document.getElementById("user_settings_fieldSet");
  UserSvcObj.containError = false;
  UserSvcObj.originalUser = {}
  // returns 201 or 401
  UserSvc.getLogInSession();

  // updates form.
  UserSvc.getUserAccountInfo().then(function(response){
    UserSvcObj.originalUser = response;
    // Loops through form items and sets the value.
    for(x in UserSvcObj.formItems){
      UserSvcObj.formItems[x].setAttribute("value",response[x]);
    }
    // Unblocks user input
    UserSvcObj.fieldset.removeAttribute("disabled");
    // Sets user image
    UserSvcObj.user_image.src=response.user_image;
  });

  $scope.checkUniqueEmail = function(){
    if(UserSvcObj.formItems.email.value.length>0 && UserSvcObj.formItems.email.value != UserSvcObj.originalUser.email){
      UserSvc.check_email(UserSvcObj.formItems.email.value).then(function(response){
        if(!response){
          UserSvcObj.errorFormItems.email.style.display = "block";
          UserSvcObj.containError = true;
        }else{
          UserSvcObj.errorFormItems.email.style.display = "none";
          UserSvcObj.containError = false;
        }
      });
    }
  }

  $scope.checkUniqueUsername = function(){
    if(UserSvcObj.formItems.username.value.length>0 && UserSvcObj.formItems.username.value != UserSvcObj.originalUser.username ){
      UserSvc.check_username(UserSvcObj.formItems.username.value).then(function(response){
        if(!response){
          UserSvcObj.errorFormItems.username.style.display = "block";
          UserSvcObj.containError = true;
        }else{
          UserSvcObj.errorFormItems.username.style.display = "none";
          UserSvcObj.containError = false;
        }
      });
    }
  }

  $scope.ConfirmChanges = function(){
    if(UserSvcObj.containError){
      return;
    }
    //email:email,first_name:firstname,last_name:lastname,username:username
    UserSvc.updateUserContent(UserSvcObj.formItems.email.value,
      UserSvcObj.formItems.first_name.value,
      UserSvcObj.formItems.last_name.value,
      UserSvcObj.formItems.username.value,UserSvcObj.originalUser._id)
      .then(function(response){
        document.getElementById("user_settings_h3_change").style.display = "block";
      })
  } // end of ConfirmChanges

  $scope.fileUploadReady = function(){
    document.getElementById('user_settings_submit').removeAttribute("disabled");
    document.getElementById('user_settings_h4_imgUp').style.display = "none";
  }

  $scope.submitImage = function(){
    var formData = new FormData;
    var file = $('#user_settings_images_input')[0].files[0];
    formData.append('image',file);
    var dis = document.createAttribute("disabled");
    document.getElementById('user_settings_submit').setAttributeNode(dis);
    UserSvc.SetUserProfileImage(formData,UserSvcObj.originalUser._id).then(function(results){
      document.getElementById('user_settings_h4_imgUp').style.display = "block";
    })
  };// End of uploadFile

});

angular.module('app').directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
}); // End of directive 'customOnChange'
