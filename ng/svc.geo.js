angular.module("app").service("GeoSvc", function ($http) {

    var svc = this;
    ///geo/:lat"+"-"+":lng
    svc.getCityState = function(location){
        return $http.get("/api/geo/" + location.coords.latitude + "-" + location.coords.longitude)
            .then(function (response) {
                return response.data;
            });
    }

}) /* End of ChatSvc*/
