angular.module('blogapp')
    .service('UserService', ['$q', 'HttpService', 'ConstService',
        function ($q, HttpService, ConstService) {
            this.getUserByName = function (username) {
                var deferred = $q.defer();

                HttpService.get(ConstService.baseAddress + 'api/users?username=' + username, deferred);

                return deferred.promise;
            };

            this.getUserById = function (userId) {
                var deferred = $q.defer();

                HttpService.get(ConstService.baseAddress + 'api/users?userId=' + userId, deferred);

                return deferred.promise;
            };

            this.getRelationshipWithUser = function (userId) {
                var deferred = $q.defer();

                HttpService.get(ConstService.baseAddress + 'api/relationships?userId=' + userId, deferred);

                return deferred.promise;
            };
        }]);