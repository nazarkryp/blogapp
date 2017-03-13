angular.module('blogapp').service('SignInService', ['$q', 'httpService', 'constService',
    function ($q, httpService, constService) {
        this.signIn = function (credentials) {
            var data = "grant_type=password&username=" + credentials.username + "&password=" + credentials.password;

            var deferred = $q.defer();
            httpService.post(constService.baseAddress + 'authorize', data, deferred);

            return deferred.promise;
        };
    }]);