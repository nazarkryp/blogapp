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

            this.getRelationshipsWithUser = function (userId) {
                var deferred = $q.defer();

                HttpService.get(ConstService.baseAddress + 'api/relationships?userId=' + userId, deferred);

                return deferred.promise;
            };

            this.invertRelationshipsWithUser = function (userId) {
                var deferred = $q.defer();

                HttpService.postEmptyModel(ConstService.baseAddress + 'api/relationships/invert?userId=' + userId, deferred);

                return deferred.promise;
            };
        }]);