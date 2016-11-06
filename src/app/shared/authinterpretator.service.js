angular.module('blogapp').factory("authInterpretatorService", ["$q", "$location", "AuthService",
    function ($q, $location, AuthService) {
        var service = {};

        var request = function (config) {
            config.headers = config.headers || {};

            var session = AuthService.getSessionInfo();

            if (session) {
                config.headers.Authorization = "Bearer " + session.access_token;
            }

            return config;
        };


        var response = function (response) {
            if (response.status === 401) {
                AuthService.signOut();
                $location.go("/signin");
            }

            return response || $q.when(response);
        };

        var responseError = function (rejection) {
            if (rejection.status === 401) {
                AuthService.signOut();
                $location.go("/signin");
            }

            return $q.reject(rejection);
        };

        service.request = request;
        service.response = response;
        service.responseError = responseError;

        return service;
    }
]);