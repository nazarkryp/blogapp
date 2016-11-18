angular.module('blogapp')
    .run(["$rootScope", "$location", "AuthService",
        function ($rootScope, $location, AuthService) {
            $rootScope.$on("$stateChangeStart",
                function (event, next) {
                    if (AuthService.Authenticated) {
                        if (next.name) {
                            if (next.url === "/signin") {
                                $location.path("/");
                            } else if (next.url === "/signup") {
                                $location.path("/");
                            }
                        }
                    }
                });
        }
    ]);;