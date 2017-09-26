angular.module('app').controller('RegisterCtrl',function($scope,$location,UserSvc){

    // register user that talks to service
    $scope.register = function(first_name,last_name,username,password,email){
    	UserSvc.register(first_name,last_name,username,password,email)
        .then(function (user) {
            $scope.$emit('login',user);
            $location.path('/register-'+username+'-userImg');
            window.location.reload();
        });

    };

    $scope.checkUniqueUser = function(){
      if($scope.register_username.length>0){
    	   UserSvc.checkUsername($scope.register_username).then(function(response){
           var label = document.getElementById('register_UserCheck');
           if(!response)
             label.style.display = "block";
           else
             label.style.display = "none";
    	   });
      }
    }

    $scope.checkUniqueEmail = function(){
    	if($scope.register_email.length>0){
        UserSvc.checkEmail($scope.register_email).then(function(response){
          var label = document.getElementById('register_EmailCheck');
          if(!response)
            label.style.display = "block";
          else
            label.style.display = "none";
      	});

      }
    }
    $scope.register_username = "";
    $scope.register_email = "";
    $scope.UniqueEmail = true;
    $scope.UniqueUser = true;
});
