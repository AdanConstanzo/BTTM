angular.module('app').controller('RegisterSetupCtrl',function($scope,UserSvc){

  var RegisterSetUp = {};
  RegisterSetUp.username = ""
  $scope.register_setup_userImage = "images/users/blank_user.png";
  // get's current user's name.
//  UserSvc.returnSessionUserName().then(function(userName){
//    RegisterSetUp.username = userName;
//    $scope.register_setup_username = userName;
//  });

  $scope.uploadFile = function(){
    var formData = new FormData;
    var nextStep = document.getElementById('register_setup_next');
    nextStep.innerHTML = "Next Step";
    var file = $('#register_setup_images_file')[0].files[0];
    formData.append('image',file);
    var headers = { transformRequest:angular.identity, headers:{'Content-Type':undefined} };
    UserSvc.SetUserProfileImage(formData);
  };// End of uploadFile

  $('#myCarousel').carousel({
       interval:   2576
   });

   var clickEvent = false;
   $('#myCarousel').on('click', '.nav a', function() {
       clickEvent = true;
       $('.nav li').removeClass('active');
       $(this).parent().addClass('active');
   }).on('slid.bs.carousel', function(e) {
     if(!clickEvent) {
       var count = $('.nav').children().length -1;
       var current = $('.nav li.active');
       console.log(count);
       console.log(current)
       current.removeClass('active').next().addClass('active');
       var id = parseInt(current.data('slide-to'));
       if(count == id) {
         $('.nav li').first().addClass('active');
       }
     }
     clickEvent = false;
   });

}); // end of Controller

angular.module('app').directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
}); // End of directive 'customOnChange'
