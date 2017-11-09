angular.module("app").controller("PostItemCtrl",function($scope,$location,UserSvc,TraingItemSvc){

    $scope.getUser = "";
    $scope.name_of_item ="";
    $scope.description_of_item ="";

    $scope.submitPost = function () {

        // makes button disabled.
        if (document.getElementById("post_item_submit")) {
            document.getElementById("post_item_submit").setAttributeNode(document.createAttribute("disabled"));
        }

        if (document.getElementById("post_item_h3_uploading")) {
            document.getElementById("post_item_h3_uploading").style.display = "block";
        }

        var formData = new FormData;
        var file = $('#post_item_image')[0].files[0];
        formData.append('image',file);
        var tradingObject = {};
        tradingObject.name = $scope.name_of_item;
        tradingObject.description = $scope.description_of_item;
        tradingObject.user = "a";

        TraingItemSvc.addItem(tradingObject,formData)
            .then(function (response) {
                console.log(response);
                $location.path('/postSuccessfull-'+response._id);
            });
    }

});
