angular.module("app")
  .config(function ($routeProvider) {
      $routeProvider
          .when("/",{controller: "HomeCtrl", templateUrl:"/templates/Home.html"})
          .when('/register',{controller:'RegisterCtrl',templateUrl:'/templates/Register.html'})
          .when('/login',{controller:'LoginCtrl',templateUrl:'/templates/Login.html'})
          .when('/barter-user-:otheruser',{controller:'BarterCtrl',templateUrl:'/templates/Barter.html'})
          .when('/my_items', {controller: "MyItemsCtrl", templateUrl: "/templates/MyItems.html"})
          .when('/brokenLink',{templateUrl:'templates/BrokenLinkError.html'})
          .when('/register-setup',{controller:'RegisterSetupCtrl',templateUrl:'/templates/RegisterSetUp.html'})
          .when('/user-settings',{controller:'UserSettings',templateUrl:'/templates/UserSettings.html'})
          .when('/user-settings-password',{controller:'UserSettingsPassword',templateUrl:'/templates/UserSettingsPassword.html'})
          .when("/postItem", {controller:"PostItemCtrl", templateUrl:"/templates/PostItem.html"})
          .when("/postSuccessfull-:id", {controller:"PostItemSuccessCtrl", templateUrl:"/templates/PostItemSuccess.html"})
          .otherwise({redirectTo: '/'});
  })
  .factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
    	response: function(response){
    		return response || $q.when(response);
    	},
    	responseError: function(rejection) {
    		if (rejection.status === 401) {
    			$location.path('/login')//.search('returnTo', $location.path());
    		}else if( rejection.status === 404){
          $location.path('/brokenLink')//.search('returnTo',$location.path());
        }
    		return $q.reject(rejection);
    	}
    }
  }])
  .config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
  }]);
