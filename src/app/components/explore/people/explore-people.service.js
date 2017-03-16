angular.module('photocloud').service('peopleService', ['$q', 'httpService', 'constService', function ($q, httpService, constService) {
    this.getUsers = function (pageIndex, pageSize) {
        var deferred = $q.defer();

        httpService.get(constService.baseAddress + 'api/users/people?pageIndex=' + pageIndex + '&pageSize=' + pageSize, deferred);

        return deferred.promise;
    };
}]);