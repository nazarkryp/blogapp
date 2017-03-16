angular.module('photocloud')
    .service('SettingsService', ['$q', 'httpService', 'constService',
        function ($q, httpService, constService) {
            this.getAccountSettings = function (userId) {
                var deferred = $q.defer();

                httpService.get(constService.baseAddress + 'api/users?userId=' + userId, deferred);

                return deferred.promise;
            };

            this.savePrivacy = function (isPrivate) {
                var deferred = $q.defer();

                httpService.postEmptyModel(constService.baseAddress + 'api/account/privacy?isPrivate=' + isPrivate, deferred);

                return deferred.promise;
            };

            this.changePassword = function (password) {
                var deferred = $q.defer();

                httpService.post(constService.baseAddress + 'api/account/password', password, deferred);

                return deferred.promise;
            };

            this.changeProfilePicture = function (attachmentId) {
                var deferred = $q.defer();

                httpService.post(constService.baseAddress + 'api/account/profile/picture?attachmentId=' + attachmentId, deferred);

                return deferred.promise;
            };

            this.updateProfile = function (profile) {
                var deferred = $q.defer();

                httpService.post(constService.baseAddress + 'api/account/profile', profile, deferred);

                return deferred.promise;
            };

            this.invertAccountStatus = function () {
                var deferred = $q.defer();

                httpService.postEmptyModel(constService.baseAddress + 'api/account/status', deferred);

                return deferred.promise;
            };

            this.saveAccountSettings = function (settings) {
                var deferred = $q.defer();

                httpService.put(constService.baseAddress + 'api/account/settings', settings, deferred);

                return deferred.promise;
            };
        }]);