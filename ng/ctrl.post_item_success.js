angular.module("app").controller("PostItemSuccessCtrl",function($scope,$routeParams,TraingItemSvc){
    $scope.postItemSuccess = {}
    TraingItemSvc.getItemById($routeParams.id)
        .then(function (response) {
            $scope.postItemSuccess = response;
            console.log(response);
        });
});
