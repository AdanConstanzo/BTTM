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
                makeSliderHtml(response[0],"Glendora");
                // handle the data here.
            })
    }

    function makeSliderHtml(array,setCode){
  		var section = document.createElement("section")
		section.id = "itemView-"+setCode;
  		section.class = "regular slider";
		// loops through cards and create div and images
  		for(x in array){
  			var divTemp = document.createElement("div"),
  			imgTemp = document.createElement("img");
  			imgTemp.src = array[x].image.path200;
  			imgTemp.id = "item-"+array[x]._id;
  			imgTemp.setAttribute("data",array[x]._id);
  			imgTemp.setAttribute("itemName",array[x].name);
  			divTemp.appendChild(imgTemp);
  			section.appendChild(divTemp);
  		}
  		// adds to collection of slider div
  		var sliderCollection = document.getElementById("home_near_by");
  		sliderCollection.appendChild(section);
		// initialize the slider
  		$("#itemView-"+setCode).slick({ arrows:false, dots: true, infinite: true, slidesToShow: 2, slidesToScroll: 2 });
	}

    //$("#cardViewSlider-"+setCode).slick({ arrows:false, dots: true, infinite: true, slidesToShow: 6, slidesToScroll: 6 });

});
