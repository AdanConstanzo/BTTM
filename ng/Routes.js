angular.module("app")
    .config(function ($routeProvider) {
        $routeProvider
            .when("/",{templateUrl:"/templates/Home.html"})
            .when('/register',{controller:'RegisterCtrl',templateUrl:'/templates/Register.html'})
            .when('/login',{controller:'LoginCtrl',templateUrl:'/templates/Login.html'})
            .when('/user',{controller:'UserCtrl', templateUrl:'/templates/User.html'})
    });
