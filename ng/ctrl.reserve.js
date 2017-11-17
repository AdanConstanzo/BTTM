angular.module('app').controller('ReservationCtrl',function($scope,$routeParams,$location,UserSvc,OfferSvc,ReservationSvc,TradingItemSvc){
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
                //User_offer_items
                //User_other_items
                for(x in response.data.User_other_items){
                    TradingItemSvc.setTradeTrueById(response.data.User_other_items[x]);
                }

                for (x in response.data.User_offer_items) {
                    TradingItemSvc.setTradeTrueById(response.data.User_offer_items[x]);
                }
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
