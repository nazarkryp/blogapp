angular.module('blogapp')
    .service('SettingsService', ['$q', 'HttpService', 'ConstService',
        function ($q, HttpService, ConstService) {
            this.getAccountSettings = function (userId) {
                var deferred = $q.defer();

                HttpService.get(ConstService.baseAddress + 'api/users?userId=' + userId, deferred);

                return deferred.promise;
            };

            this.savePrivacy = function (isPrivate) {
                var deferred = $q.defer();

                HttpService.postEmptyModel(ConstService.baseAddress + 'api/account/privacy?isPrivate=' + isPrivate, deferred);

                return deferred.promise;
            };

            this.changePassword = function (password) {
                var deferred = $q.defer();

                HttpService.post(ConstService.baseAddress + 'api/account/password', password, deferred);

                return deferred.promise;
            };

            this.changeProfilePicture = function (attachmentId) {
                var deferred = $q.defer();

                HttpService.post(ConstService.baseAddress + 'api/account/profile/picture?attachmentId=' + attachmentId, deferred);

                return deferred.promise;
            };

            this.updateProfile = function (profile) {
                var deferred = $q.defer();

                HttpService.post(ConstService.baseAddress + 'api/account/profile', profile, deferred);

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