angular.module('photocloud').filter('buttonStatusColor', ['$filter', function ($filter) {
    return function (isActive) {
        if (isActive) {
            return 'red';
        }

        return 'blue';
    };
}]);