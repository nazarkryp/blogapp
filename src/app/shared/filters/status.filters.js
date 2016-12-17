angular.module('blogapp').filter('buttonStatusColor', ['$filter', function ($filter) {
    return function (isActive) {
        if (isActive) {
            return 'blue';
        }

        return 'grey';
    };
}]);