angular.module('blogapp')
    .service('UploadService', ['$q', '$http', 'HttpService', 'ConstService',
        function($q, $http, HttpService, ConstService) {
            this.uploadFile = function(file) {
                var deferred = $q.defer();

                HttpService.postMultipart(ConstService.baseAddress + 'api/attachments/upload', file, deferred);

                return deferred.promise;
            };
        }]);