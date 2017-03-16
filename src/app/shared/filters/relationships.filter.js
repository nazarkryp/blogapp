angular.module('photocloud').filter('relationshipButton', ['$filter', function ($filter) {
    return function (status) {
        if (status === 'None') {
            return 'FOLLOW';
        } else if (status === 'Followed') {
            return 'FOLLOWING';
        } else if (status == 'Requested') {
            return 'REQUESTED';
        }

        return status;
    };
}]);