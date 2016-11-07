angular.module('blogapp').service('SignUpService', ['$q', 'HttpService', 'ConstService',
    function ($q, HttpService, ConstService) {
        this.signUp = function (user) {
            var deferred = $q.defer();

            HttpService.post(ConstService.baseAddress + 'api/account/create', data, deferred);

            return deferred.promise;
        };
    }]);