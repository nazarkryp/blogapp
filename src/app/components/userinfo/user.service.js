angular.module('photocloud')
    .service('userService', ['$q', 'httpService', 'constService',
        function ($q, httpService, constService) {
            this.getUserByName = function (username) {
                var deferred = $q.defer();

                httpService.get(constService.baseAddress + 'api/users?username=' + username, deferred);

                return deferred.promise;
            };

            this.getUserById = function (userId) {
                var deferred = $q.defer();

                httpService.get(constService.baseAddress + 'api/users?userId=' + userId, deferred);

                return deferred.promise;
            };

            this.getRelationshipsWithUser = function (userId) {
                var deferred = $q.defer();

                httpService.get(constService.baseAddress + 'api/relationships?userId=' + userId, deferred);

                return deferred.promise;
            };

            this.invertRelationshipsWithUser = function (userId) {
                var deferred = $q.defer();

                httpService.postEmptyModel(constService.baseAddress + 'api/relationships/invert?userId=' + userId, deferred);

                return deferred.promise;
            };

            this.getIncommingRequests = function () {
                var deferred = $q.defer();

                httpService.get(constService.baseAddress + 'api/relationships/requests', deferred);

                return deferred.promise;
            };

            this.responseIncommingRequest = function (userId, accept) {
                var deferred = $q.defer();

                httpService.postEmptyModel(constService.baseAddress + 'api/relationships/response?userId=' + userId + '&accept=' + accept, deferred);

                return deferred.promise;
            };
        }]);