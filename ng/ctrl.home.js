angular.module("app").controller("HomeCtrl", function($scope,$rootScope,GeoSvc,TradingItemSvc){

    $scope.UserCity = "";

    // A function that gets the current geolocaiton. If not. Will return error.
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $scope.UserCity = "Geolocation is not supported by this browser.";
        }
    }

    // function that gets proccessed after geolocation is captured.
    // will set it to local storage.
    function showPosition(position) {
        GeoSvc.getCityState(position)
            .then(function (response) {
                if (response.status == "ERROR" ) {
                    $scope.UserGeo = null;
                } else {
                    $scope.UserGeo = response;
                }
                var usr_loc_string = JSON.stringify(response);
                localStorage.setItem("usr-loc",usr_loc_string);
            });
    }

    var str = localStorage.getItem("usr-loc");
    var usr_loc_obj = JSON.parse(str);

    // condition to check if there is a current geo locator.
    // will call function. If not. Will grab trading data form database.
    if (usr_loc_obj === null || usr_loc_obj.status === "ERROR") {
        getLocation();
    } else {
        $scope.UserGeo = usr_loc_obj;
        TradingItemSvc.getItemFromCityState(usr_loc_obj)
            .then(function (response) {
                // handle the data here.
            })
    }

    

});
