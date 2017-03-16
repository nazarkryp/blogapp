angular.module('photocloud').filter('accountActionStatus', ['$filter', function ($filter) {
    return function (isActive) {
        if (isActive) {
            return 'Deactivate';
        }

        return 'Activate';
    };
}]);