angular.module('app').controller('RegisterSetupCtrl',function($scope,UserSvc){

  var RegisterSetUp = {};
  RegisterSetUp.username = ""
  $scope.register_setup_userImage = "images/users/blank_user.png";
  // get's current user's name.
  UserSvc.returnSessionUserName().then(function(userName){
    RegisterSetUp.username = userName;
    $scope.register_setup_username = userName;
  });

  $scope.uploadFile = function(){
    var formData = new FormData;
    var nextStep = document.getElementById('register_setup_next');
    nextStep.innerHTML = "Next Step";
    var file = $('#register_setup_images_file')[0].files[0];
    formData.append('image',file);
    var headers = { transformRequest:angular.identity, headers:{'Content-Type':undefined} };
    UserSvc.SetUserProfileImage(formData);
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
