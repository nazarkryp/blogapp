angular.module('blogapp').service('SignUpService', ['$q', 'httpService', 'constService',
    function ($q, httpService, constService) {
        this.signUp = function (user) {
            var deferred = $q.defer();

            httpService.post(constService.baseAddress + 'api/account/create', user, deferred);

            return deferred.promise;
        };
    }]);