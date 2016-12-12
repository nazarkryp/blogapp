angular.module('blogapp')
    .service('SettingsService', ['$q', 'HttpService', 'ConstService',
        function ($q, HttpService, ConstService) {
            this.getAccountSettings = function (userId) {
                var deferred = $q.defer();

                HttpService.get(ConstService.baseAddress + 'api/users?userId=' + userId, deferred);

                return deferred.promise;
            };

            this.invertAccountPrivacyStatus = function () {
                var deferred = $q.defer();

                HttpService.postEmptyModel(ConstService.baseAddress + 'api/account/privacy', deferred);

                return deferred.promise;
            };

            this.invertAccountStatus = function () {
                var deferred = $q.defer();

                HttpService.postEmptyModel(ConstService.baseAddress + 'api/account/status', deferred);

                return deferred.promise;
            };

            this.saveAccountSettings = function (settings) {
                var deferred = $q.defer();

                HttpService.put(ConstService.baseAddress + 'api/account/settings', settings, deferred);

                return deferred.promise;
            };
        }]);