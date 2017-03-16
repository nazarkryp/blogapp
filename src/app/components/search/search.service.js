angular.module('photocloud')
    .service('SearchService', ['$q', 'httpService', 'constService',
        function ($q, httpService, constService) {
            this.search = function (searchQuery) {
                var deferred = $q.defer();

                httpService.get(constService.baseAddress + 'api/users/search?searchQuery=' + searchQuery, deferred);

                return deferred.promise;
            };
        }]);