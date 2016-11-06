angular.module('blogapp').service('SignInService', ['$q', 'HttpService', 'ConstService',
    function ($q, HttpService, ConstService) {
        this.signIn = function (credentials) {
            var data = "grant_type=password&username=" + credentials.username + "&password=" + credentials.password;

            var deferred = $q.defer();
            HttpService.post(ConstService.baseAddress + 'authorize', data, deferred);

            return deferred.promise;
        };
    }]);