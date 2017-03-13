angular.module('blogapp')
    .service('UploadService', ['$q', '$http', 'httpService', 'constService',
        function($q, $http, httpService, constService) {
            this.uploadFile = function(file) {
                var deferred = $q.defer();

                httpService.postMultipart(constService.baseAddress + 'api/attachments/upload', file, deferred);

                return deferred.promise;
            };
        }]);