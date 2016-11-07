angular.module("blogapp").service("HttpService", ["$http", function ($http) {
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
    }

    this.put = function (url, data, deferred) {
        $http.put(url)
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
}]);