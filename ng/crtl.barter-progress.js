angular.module("app").controller("BarterProgCrtl", function ($scope) {

    // // Note: This example requires that you consent to location sharing when
    // // prompted by your browser. If you see the error "The Geolocation service
    // // failed.", it means you probably did not give permission for the browser to
    // // locate you.
    var map, infoWindow;
    $scope.showMap = false;

    $scope.show = function(htmNa){
        if(document.getElementById(htmNa) && $scope.showMap == false){
            $scope.showMap = !$scope.showMap;
            document.getElementById(htmNa).innerHTML = "<strong>Hide Your Location</strong>";
        } else{
            $scope.showMap = !$scope.showMap;
            document.getElementById(htmNa).innerHTML = "<strong>Show Your Location</strong>";
        }

    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
});    