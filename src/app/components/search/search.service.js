angular.module('blogapp')
    .controller('SearchService', ['$q', 'HttpService', 'ConstService',
        function($q, HttpService, ConstService) {
            this.search = function(searchQuery) {
                var deferred = $q.defer();
                
                HttpService.get(ConstService.baseAddress + 'api/users/search?searchQuery=' + searchQuery);

                return deferred.promise;
            };
        }]);