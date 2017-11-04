angular.module("app").service("TraingItemSvc", function ($http) {
  var svc = this;

  /*
  name :          {type:String,required:true},
  description :   {type:String,required:true},
  image :         [String],
  dateOf:         {type:Date,required:true,default: Date.now},
  user  :         {type:String,required:true}
  */

   // /trading/addItem
   svc.addItem  = function(tradingObject){
       return $http.post("api/trading/addItem/"{
           name: tradingObject.name,
           description: tradingObject.description,
           image: tradingObject.image,
           user: tradingObject.user
       }).then(function(response){
           return response.data;
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
            return allItem.data;
        });
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

}) /* End of ChatSvc*/
