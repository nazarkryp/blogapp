(function () {
    'use strict';

    angular.module("photocloud")
        .service("httpService", httpService);

    httpService.$inject = ["$http"];

    function httpService($http) {
        this.get = function (url, deferred) {
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error, status) {
                    var errorObject = {
                        error: error,
                        status: status
                    };

                    deferred.reject(errorObject);
                });
        };

        this.post = function (url, data, deferred) {
            $http.post(url, data)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
        };

        this.postEmptyModel = function (url, deferred) {
            $http.post(url)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
        }

        this.put = function (url, data, deferred) {
            $http.put(url, data)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
        };

        this.delete = function (url, data, deferred) {
            $http.delete(url, data)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
        };

        this.postMultipart = function (url, data, deferred) {
            var formData = new FormData();

            formData.append('"' + data.name + '"', data);

            $http.post(url,
                formData,
                {
                    headers: {
                        "Content-Type": undefined
                    }
                })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
        };
    }
})();