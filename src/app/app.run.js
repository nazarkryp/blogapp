angular.module('blogapp')
    .run(["$rootScope", "$location", "AuthService",
        function ($rootScope, $location, AuthService) {
            $rootScope.$on("$stateChangeStart",
                function (event, next) {
                    if (AuthService.authenticated) {
                        if (next.name) {
                            if (!AuthService.isActive) {
                                $location.path("/settings");
                                return;
                            }

                            if (next.url === "/signin") {
                                $location.path("/");
                            } else if (next.url === "/signup") {
                                $location.path("/");
                            }
                        }
                    }
                });
        }
    ]);