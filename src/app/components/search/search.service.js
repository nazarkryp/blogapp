angular.module('blogapp')
    .service('SearchService', ['$q', 'HttpService', 'ConstService',
        function ($q, HttpService, ConstService) {
            this.search = function (searchQuery) {
                var deferred = $q.defer();

                HttpService.get(ConstService.baseAddress + 'api/users/search?searchQuery=' + searchQuery, deferred);

                return deferred.promise;
            };
        }]);