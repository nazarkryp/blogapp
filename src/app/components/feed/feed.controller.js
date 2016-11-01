angular.module('blogapp')
    .controller('FeedController', ['$scope', '$state', function ($scope, $state) {
        $scope.title = 'Feed controller loaded';
    }]);