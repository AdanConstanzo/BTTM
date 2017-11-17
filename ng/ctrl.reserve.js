angular.module('app').controller('ReservationCtrl',function($scope,$routeParams,$location,UserSvc,OfferSvc,ReservationSvc){
    //$routeParams.id
    $(function () {
        $("#datepicker").datepicker({
            showOn: "button",
            buttonImage: "https://i.imgur.com/xyqM5eV.png?2",
            buttonImageOnly: true,
            buttonText: "Pick a date"
        });
        $('#basicExample').timepicker();
    });

    $scope.reservation = {};
    $scope.reservation.offerId = $routeParams.id;
    $scope.reservation.location = {};
    $scope.reservation.date = {};

    $scope.submitReservation = function() {
        var time = $('#basicExample').val();
        var date = $('#datepicker').val();
        $scope.reservation.date.time = time;
        $scope.reservation.date.day = date;
        if(time === "" || date === "") {
            document.getElementById("reservation_h4_warrning").style.display = "block";
            return;
        }
        ReservationSvc.makeReservation($scope.reservation)
            .then(function (response) {
                $location.path("/pendingTrades");
            })
    }

    UserSvc.getUserAccountInfo()
        .then(function (User) {
            $scope.reservation.location.latitude = User.geocode.lat;
            $scope.reservation.location.longitude = User.geocode.lng;
            //Areapicker
            $("#areapicker").locationpicker({
                location: {
                    latitude: User.geocode.lat,
                    longitude: User.geocode.lng
                },
                radius: 200,
                inputBinding: {
                    locationNameInput: $('#address')
                },
                enableAutocomplete: true,
                onchanged: function (currentLocation, radius, isMarkerDropped) {
                    $scope.reservation.location = currentLocation
                }
            });

        });

});
