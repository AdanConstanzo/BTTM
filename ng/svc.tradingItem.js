angular.module("app").service("TradingItemSvc", function ($http) {
    var svc = this;

    svc.addItem  = function(tradingObject,form){
        return $http.post("api/trading/addItem/",tradingObject)
        .then(function(response){
            console.log(response);
            return $http.put("api/trading/updateImage/"+response.data._id,form,{ transformRequest:angular.identity, headers:{'Content-Type':undefined}})
            .then(function (response2) {
                console.log(response2);
                return response2.data;
            });
       });
   }

  svc.getUsersTradingObjects = function(otherUser){
    return $http.get("api/chat/"+otherUser).then(function(response){
      return response.data;
    });
  };

  // /trading/getItems/:username
  svc.getAllUserTradingItems = function (username) {
      return $http.get("api/trading/getItems/"+username)
        .then(function (allItem) {
            allItem.data.shift();
            return allItem.data;
        });
  }

  // gets all items form database
  svc.getAllItems = function(){
      return $http.get("api/trading/getAllItems/")
        .then(function (allItems){
            return allItems.data;
        });
  }

  // get all but user
  svc.getAllItemsBut = function(UserName){
      return $http.get("api/trading/getAllItemsBut/"+us)
        .then(function (Items){
            return Items.data;
        })
  }

  // /trading/getItems/findOne/:id
  svc.getItemById = function (id) {
      return $http.get("api/trading/getItems/findOne/"+id)
        .then(function (item){
            return item.data;
        })
  }


  // /trading/deleteItems/:id
  svc.deleteItem = function (id) {
      return $http.delete("api//trading/deleteItems/" + id)
        .then(function (response){
            return response;
        });
  }


  // /trading/editItems/:id
  svc.editItem = function (id) {
      return $http.put("api/trading/editItems/" + id)
        .then(function (response){
            return response;
        })
  }

  svc.getItemFromCityState = function (GeoObject) {
      return $http.get("api/trading/grabItemByCity-State/"+GeoObject.city+"-"+GeoObject.state)
        .then(function (response) {
            if(response.data[0].status === "ERROR") {
                return response.data;
            } else {
                response.data.shift();
                return response.data;
            }
        })
  }

  svc.getItemFromCityStateAvoidUser = function(GeoObject,UserName){
      return $http.get("api/trading/grabItemByCity-State/avoid-"+UserName+"/"+GeoObject.city+"-"+GeoObject.state)
        .then(function (response) {
            if(response.data[0].status === "ERROR") {
                return response.data;
            } else {
                response.data.shift();
                return response.data;
            }
        })
  }

  svc.setTradeTrueById = function(_id){
      return $http.get("api/trading/setTradeTrueById/"+_id)
        .then(function (response){
            return response;
        })
  }

  svc.setTradeFalseById = function(_id){
      return $http.get("api/trading/setTradeFalseById/"+_id)
        .then(function (response){
            return response;
        })
  }

}) /* End of ChatSvc*/
