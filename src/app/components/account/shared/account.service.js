(function () {
    'use strict';

    angular.module('photocloud')
        .service('accountService', accountService);

    accountService.$inject = ['$q', 'httpService', 'constService'];

    function accountService($q, httpService, constService) {
        this.createAccount = function (account) {
            var deferred = $q.defer();

            httpService.post(constService.baseAddress + 'api/account/create', account, deferred);

            return deferred.promise;
        }

        this.checkIfUserExists = function (account) {
            var deferred = $q.defer();

            httpService.post(constService.baseAddress + 'api/account/verify', account, deferred);

            return deferred.promise;
        }

        this.signIn = function (signInData) {
            var data = "grant_type=password&username=" + signInData.username + "&password=" + signInData.password;

            var deferred = $q.defer();

            httpService.post(constService.baseAddress + 'authorize', data, deferred);

            return deferred.promise;
        }
    }
})();