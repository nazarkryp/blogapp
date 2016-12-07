angular.module('blogapp').filter('relationshipStatus', ['$filter', function ($filter) {
    return function (isFollowedByUser) {
        if (isFollowedByUser) {
            return 'FOLLOWING';
        }

        return 'FOLLOW';
    };
}]);