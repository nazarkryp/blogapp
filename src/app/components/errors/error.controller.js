angular.module('blogapp').controller('ErrorController', ['$scope', 'error', function ($scope, error) {
    $scope.error = error;
}]);