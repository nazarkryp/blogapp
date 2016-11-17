angular.module('blogapp')
    .service('UserService', ['$q', 'HttpService', 'ConstService',
        function ($q, HttpService, ConstService) {
            this.getRelationships = function (userId) {
                var deferred = $q.defer();

                HttpService.get(ConstService.baseAddress + 'api/relationships?userId=' + userId, deferred);

                return deferred.promise;
            };
        }]);