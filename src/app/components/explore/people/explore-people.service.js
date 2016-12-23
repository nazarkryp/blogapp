angular.module('blogapp').service('PeopleService', ['$q', 'HttpService', 'ConstService', function ($q, HttpService, ConstService) {
    this.getUsers = function (pageIndex, pageSize) {
        var deferred = $q.defer();

        HttpService.get(ConstService.baseAddress + 'api/users/people?pageIndex=' + pageIndex + '&pageSize=' + pageSize, deferred);

        return deferred.promise;
    };
}]);