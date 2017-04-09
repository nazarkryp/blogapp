angular.module('photocloud')
    .factory("httpInterceptor", ["$q", "$location", "authService",
        function ($q, $location, authService) {
            var service = {};

            var request = function (config) {
                config.headers = config.headers || {};

                if (config.url && config.url.includes('api.cloudinary.com')) {
                    return config;
                }

                var session = authService.getSession();

                if (session) {
                    config.headers.Authorization = "Bearer " + session.access_token;
                }

                return config;
            };

            var response = function (response) {
                if (response.status === 401) {
                    authService.signOut();
                    $location.path("/signin");
                }

                return response || $q.when(response);
            };

            var responseError = function (rejection) {
                if (rejection.status === 401) {
                    authService.signOut();
                    $location.path("/signin");
                }

                return $q.reject(rejection);
            };

            service.request = request;
            service.response = response;
            service.responseError = responseError;

            return service;
        }
    ]);