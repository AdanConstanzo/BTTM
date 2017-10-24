angular.module('app').controller('RegisterSetupCtrl',function($scope,UserSvc){

  var RegisterSetUp = {};
  RegisterSetUp.username = ""
  RegisterSetUp.user = {};
  $scope.register_setup_userImage = "images/users/blank_user.png";

  UserSvc.getRegisterSession();

  // get's current user's name.
  UserSvc.getUserAccountInfo().then(function(UserObject){
    RegisterSetUp.user = UserObject;
    $scope.register_setup_username = UserObject.username;

  });

  $scope.fileUpClient = function(){
    var nextStep = document.getElementById('register_setup_next');
    nextStep.innerHTML = "Next Step";
  }

  $scope.continueRegister = function(){
    var formData = new FormData;
    var file = $('#register_setup_images_file')[0].files[0];
    formData.append('image',file);
    UserSvc.SetUserProfileImage(formData,RegisterSetUp.user._id);
    UserSvc.destoryRegisterSession();
  }

  // destroys the register session.
  var destoryRegister =function(){
    UserSvc.destoryRegisterSession();
  }

  // modifys window (browser) reload/close event.
  window.onbeforeunload = destoryRegister;

  // modifys window (browser) url change event.
  window.onhashchange = function(event){
    if(event.oldURL == "http://localhost:3000/#/register-setup"){
      UserSvc.destoryRegisterSession();
    }
  }


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
