angular.module('app').service('UserSvc', function ($http,$q) {

    var svc = this;

    // updates user's firstname,lastname,username,email
    // requires autentication
    // done with session user.
    svc.updateUserContent = function(email,firstname,lastname,username,id){
      return $http.post('api/users/updateUser/',{email:email,first_name:firstname,last_name:lastname,username:username,_id:id});
    }

    svc.SetUserProfileImage = function(Form,_id){
      return $http.post('api/users/profileImage/'+_id,Form,{ transformRequest:angular.identity, headers:{'Content-Type':undefined}}).then(function(response){
        return response.data;
      })
    }

    //checks if username is current in db
    svc.check_username = function(username){
        return $http.get('/api/users/checkUsername/'+username).then(function(response){
            return response.data;
        });
    };

    //check if email is current in db
    svc.check_email = function(email){
        return $http.get('/api/users/checkEmail/'+email).then(function(response){
            return response.data;
        });
    };

    // get current users info
    // used for login user.
    // DO NOT USE
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
    svc.register = function (first_name,last_name,username,password,email,city,state) {
        return $http.post('/api/users',{
            first_name: first_name, last_name:last_name, username: username, password:password,email:email,location: {city:city,state:state}
        }).then(function (response) {
            console.log(response);
            svc.calculateLatLng(response.data._id,city,state);
            return svc.login(username,password);
        })
    };

    svc.calculateLatLng = function(_id,city,state){
        console.log("HIT");
        return $http.put("/api/users/updateLatLong/" + _id +"-"+city+"-"+state)
    }

    // gets current user's account info
    // requires autentication
    // done with session
    // username,email,firstname,lastname,profilepic
    svc.getUserAccountInfo = function(){
        return $http.get('/api/users/user/accountInfo').then(function(response){
            return response.data;
        });
    }

    svc.changePassword = function(UserPassword,NewPassword){
      console.log(UserPassword,NewPassword);
      return $http.post('/api/users/user/changepassword',{password:UserPassword,new_password:NewPassword})
      .then(function(response){ return response; },function(err){ return err; })
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

    //returns user session
    // 201 or 401
    svc.getLogInSession = function(){
      return $http.get('/api/users/login/session').then(function(response){
        return response.data;
      })
    }

    // returns register session
    svc.getRegisterSession = function(){
      return $http.get('/api/users/register/session')
      .then(function(response){
        return response.data;
      })
    }

    // destroys session.
    svc.destoryRegisterSession = function(){
      return $http.post('/api/users/register/session/destroy/');
    }

});
