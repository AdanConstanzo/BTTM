angular.module("app")
  .config(function ($routeProvider) {
      $routeProvider
          .when("/",{templateUrl:"/templates/Home.html"})
          .when('/register',{controller:'RegisterCtrl',templateUrl:'/templates/Register.html'})
          .when('/login',{controller:'LoginCtrl',templateUrl:'/templates/Login.html'})
          .when('/barter-user-:otheruser',{controller:'BarterCtrl',templateUrl:'/templates/Barter.html'})
          .when('/brokenLink',{templateUrl:'templates/BrokenLinkError.html'})
          .when('/register-setup',{controller:'RegisterSetupCtrl',templateUrl:'/templates/RegisterSetUp.html'})
          .when('/user',{controller:'UserCtrl',templateUrl:'/templates/User.html'})

          .when('/About',{templateUrl:'/templates/About.html'})







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
