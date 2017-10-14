angular.module('app').service('UserSvc', function ($http,$q) {

    var svc = this;

    svc.SetUserProfileImage = function(Form){
      return $http.post('api/users/profileImage/',Form,{ transformRequest:angular.identity, headers:{'Content-Type':undefined}}).then(function(response){
        return response.data;
      })
    }

    //checks if username is current in db
    svc.checkUsername = function(username){
        return $http.get('/api/users/checkUsername/'+username).then(function(response){
            return response.data;
        });
    };

    //check if email is current in db
    svc.checkEmail = function(email){
        return $http.get('/api/users/checkEmail/'+email).then(function(response){
            return response.data;
        });
    };

    // get current users info
    // used for login user.
    svc.getUser = function () {
        return $http.get('/api/users')
            .then(function (response) {
                return response.data
            })
    };

    // logs in user
    svc.login = function (username, password) {
        // get signature from post
        return $http.post('/api/sessions', {
            username: username, password: password})
        .then(function (response) {
            // sets the x-auth to later compare in getUser
            $http.defaults.headers.common['X-Auth'] = response.data;
            return svc.getUser()
        },function(err){
            return err
        });
    };

    // api call to register a user.
    svc.register = function (first_name,last_name,username,password,email) {
        return $http.post('/api/users',{
            first_name: first_name, last_name:last_name, username: username, password:password,email:email
        }).then(function () {
            return svc.login(username,password);
        })
    };

    // gets current user's account info
    // requires autentication
    // done with session
    // username,email,firstname,lastname,profilepic
    svc.getUserAccountInfo = function(){
        return $http.get('/api/users/user/accountInfo').then(function(response){
            return response.data;
        });
    }

    // gets username's open info.
    // must enter a username.
    // username,firstname,lastname,profilepic
    svc.getUserOpenInfo = function(username){
      return $http.get('/api/users/userOpen/'+username).then(function(response){return response.data; })
    }

    // api call to log out current user.
    svc.logout = function(){
        return $http.get('/api/users/logout');
    }

    // requires session.
    // return session's username.
    svc.returnSessionUserName = function () {
        return $http.get('/api/users/user')
        .then(function(response){
            return response.data
        });
    };

    // checks for session.
    // returns true or false.
    svc.hasSession = function(){
        return $http.get('/api/users/session')
        .then(function(response){
            return response.data;
        });
    }

    // returns register session
    svc.getRegisterSession = function(){
      return $http.get('/api/users/register/session')
      .then(function(response){
        return response.data;
      })
    }

    svc.destoryRegisterSession = function(){
      return $http.post('/api/users/register/session/destroy/');
    }

});
