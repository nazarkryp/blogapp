angular.module('blogapp').controller('IndexController', ['$scope', '$state', function ($scope, $state) {
    $scope.gotoSignInPage = function () {
        $state.go('signin');
    };

    $scope.gotoFeedPage = function () {
        $state.go('feed');
    };
}]);