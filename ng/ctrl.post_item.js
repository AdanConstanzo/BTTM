angular.module("app").controller("PostItemCtrl",function($scope,$location,UserSvc,TraingItemSvc){

    $scope.getUser = "";
    $scope.name_of_item ="";
    $scope.description_of_item ="";

    UserSvc.getUserAccountInfo().then(function(UserObject){
      $scope.getUser = UserObject.username;
    });


    $scope.submitPost = function () {
        var errors = false;
        // makes button disabled.
        var formData = new FormData;
        var file = $('#post_item_image')[0].files[0];
        formData.append('image',file);

        if (file == null) {
            errors = true;
            if (document.getElementById("post_item_error_image")) {
                document.getElementById("post_item_error_image").style.display = "block";
            }
        }

        var tradingObject = {};
        tradingObject.name = $scope.name_of_item;
        tradingObject.description = $scope.description_of_item;
        tradingObject.user = $scope.getUser;

        for(x in tradingObject) {
            if(tradingObject[x] === null || tradingObject[x] === undefined || tradingObject[x].length <= 0){
                displayError(x);
                errors = true;
            } else {
                removeError(x);
            }
        }

        if(errors === false) {
            if (document.getElementById("post_item_submit")) {
                document.getElementById("post_item_submit").setAttributeNode(document.createAttribute("disabled"));
            }

            if (document.getElementById("post_item_h3_uploading")) {
                document.getElementById("post_item_h3_uploading").style.display = "block";
            }
        } else {
            return;
        }

        TraingItemSvc.addItem(tradingObject,formData)
            .then(function (response) {
                console.log(response);
                $location.path('/postSuccessfull-'+response._id);
            });
    }

    function displayError(nameOf) {
        if (document.getElementById("post_item_error_"+nameOf)) {
            document.getElementById("post_item_error_"+nameOf).style.display = "block";
        }
    }

    function removeError(nameOf) {
        if (document.getElementById("post_item_error_"+nameOf)) {
            document.getElementById("post_item_error_"+nameOf).style.display = "none";
        }
    }

});
