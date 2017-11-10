angular.module("app").controller("PostItemSuccessCtrl",function($scope,$routeParams,TradingItemSvc){
    $scope.postItemSuccess = {}
    TradingItemSvc.getItemById($routeParams.id)
        .then(function (response) {
            $scope.postItemSuccess = response;
            console.log(response);
        });
});
