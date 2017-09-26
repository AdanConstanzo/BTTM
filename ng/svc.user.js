angular.module('app').service('UserSvc', function ($http,$q) {

    var svc = this;

    svc.CheckRegisterAndLogin = function(pageId,RegisterUserImage){
      return svc.hasSession().then(function(response){
        if(response){
          svc.CheckRegister().then(function(response){
            if(!response){
              var error = document.getElementById(pageId);
              error.innerHTML = "You already Register";
            }else{
              svc.checkLogIn().then(function(response){
                RegisterUserImage['username'] = response;
              });
            }
          });
        }else {
            var error = document.getElementById(pageId);
            error.innerHTML = "Please Login In";
            return false;
        }
      });
    }

    svc.CheckRegister = function(){
      return $http.get('api/users/register/session/status/')
      .then(function(response){
        return response.data;
      })
    }

    svc.SetUserProfileImage = function(Form){
      return $http.post('api/users/profileImage/',Form,{ transformRequest:angular.identity, headers:{'Content-Type':undefined}}).then(function(response){
        return response.data;
      })
    }

    //
    svc.destroyRegisterSession = function(){
      return $http.get('api/users/register/session/destroy/').then(function(res){
        return res.data;
      })
    }

    //
    svc.SetUserBannerObject = function(bannerObject){
      return $http.post('api/users/SetUserBannerImage',{bannerObject:bannerObject});
    };

    //
    svc.checkUsername = function(username){
        return $http.get('/api/users/checkUsername/'+username).then(function(response){
            return response.data;
        });
    };

    //
    svc.checkEmail = function(email){
        return $http.get('/api/users/checkEmail/'+email).then(function(response){
            return response.data;
        });
    };

    // get current users info
    // requires autentication
    svc.getUser = function () {
        return $http.get('/api/users')
            .then(function (response) {
                return response.data
            })
    };

    // log them in & sets local storage
    svc.login = function (username, password) {
        // get signature from post
        return $http.post('/api/sessions', {
            username: username, password: password})
        .then(function (response) {
            // sets the x-auth to later compare in getUser
            $http.defaults.headers.common['X-Auth'] = response.data;
            return svc.getUser()
        },function(err)
        {
            return err
        })
    };

    // register a user
    svc.register = function (first_name,last_name,username,password,email) {
      console.log(username);
      console.log(email);
        return $http.post('/api/users',{
            first_name: first_name, last_name:last_name, username: username, password:password,email:email
        }).then(function () {
            return svc.login(username,password);
        })
    };

    // get user's info with username
    // requires autentication
    svc.getUserPublicInfo = function(username){
        return $http.get('/api/users/user/'+username).then(function(response){
            return response.data;
        });
    }

    //
    svc.getUserOpenInfo = function(username){
      return $http.get('/api/users/userOpen/'+username).then(function(response){return response.data; })
    }

    //
    svc.getUserImage = function(username){
      return svc.getUserOpenInfo(username).then(function(userInfo){
        var images = {};
        images['userImage'] = userInfo['user_image'];
        images['userBanner'] = userInfo['user_banner'];
        return images
      });
    }

    //
    svc.logout = function()
    {
        return $http.get('/api/users/logout')
    }

    // return session's username
    svc.checkLogIn = function () {
        return $http.get('/api/users/user')
        .then(function(response)
        {
            return response.data
        })
    };

    // check for session.
    svc.hasSession = function(){
        return $http.get('/api/users/session')
        .then(function(response){
            return response.data;
        });
    }

    //
    svc.deleteSingleCard = function(cardId)
    {
        return $http.post('/api/user/removeElement',{cardId:cardId})
        .then(function(response)
        {
            return response.data
        })
    }

})
