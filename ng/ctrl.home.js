angular.module("app").controller("HomeCtrl", function($scope,$rootScope,UserSvc,GeoSvc,TradingItemSvc){

    $scope.UserCity = "";
    $scope.Items = [];
    $scope.HomeCtrlRedirect = false;
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
            .then(function (ItemsInCity) {
                UserSvc.hasSession()
                    .then(function(response){
                        if(response){
                            UserSvc.returnSessionUserName()
                                .then(function(username){
                                    var cityState = usr_loc_obj.city+", "+usr_loc_obj.state;
                                    makeSliderHtml(ItemsInCity[0],usr_loc_obj.city,cityState,username);
                                });
                        } else {
                            var cityState = usr_loc_obj.city+", "+usr_loc_obj.state;
                            makeSliderHtml(ItemsInCity[0],usr_loc_obj.city,cityState);
                        }
                    });
            });
    }

    function makeSliderHtml(array,setCode,cityState,username){

        var itemDiv = document.getElementById("itemDiv");
        //<div class="Home_Title"> Nearyby Trades by City<hr /></div>
        var ItemTitle = document.createElement("div");
        ItemTitle.className = "Home_Title";
        ItemTitle.innerHTML = "Neary by Trades at City " + cityState +"<hr />";
        itemDiv.appendChild(ItemTitle);

  		var section = document.createElement("section")
		section.id = "itemView-"+setCode;
  		section.class = "regular slider";
		// loops through cards and create div and images
  		for(x in array){
            if(array[x].user !== username){
                $scope.Items.push(array[x]);
      			var divTemp = document.createElement("div"),
      			imgTemp = document.createElement("img"),
                imgTempName = document.createElement("p");
      			imgTemp.src = array[x].image.path200;
      			imgTemp.id = "item-"+array[x]._id;
                imgTemp.setAttribute("data-toggle","modal");
                imgTemp.setAttribute("data-target","#modal_"+array[x]._id);
                imgTempName.innerHTML = array[x].name;
      			divTemp.appendChild(imgTemp);
                divTemp.appendChild(imgTempName);
      			section.appendChild(divTemp);
            }
  		}
  		// adds to collection of slider div
  		var sliderCollection = document.createElement("div");
        sliderCollection.id = "home_near_by_" + setCode;
  		sliderCollection.appendChild(section);
        itemDiv.appendChild(sliderCollection);
		// initialize the slider
  		$("#itemView-"+setCode).slick({ arrows:true, dots: true, infinite: true, slidesToShow: 3, slidesToScroll: 3 });
    }

    function setListeners(array){
        for(x in array){
            var a = document.getElementById("a_"+array[x]._id);
            a.onclick = function(){
                $scope.HomeCtrlRedirect = true;
            }
            $("#modal_" + array[x]._id).on("hidden.bs.modal", function(e) {
                var user = array[x].user
                if($scope.HomeCtrlRedirect == true){
                    window.location = "/#/barter-user-"+user;
                }
            });
        }
    }
    //$("#cardViewSlider-"+setCode).slick({ arrows:false, dots: true, infinite: true, slidesToShow: 6, slidesToScroll: 6 });
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        setListeners($scope.Items)
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
    });

});


angular.module("app").directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});
