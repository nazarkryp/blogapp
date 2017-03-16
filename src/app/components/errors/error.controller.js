angular.module('photocloud').controller('ErrorController', ['$scope', 'error', function ($scope, error) {
    $scope.error = error;
}]);