angular.module('blogapp')
    .run(["$rootScope", "$state", "AuthService",
        function ($rootScope, $state, AuthService) {
            $rootScope.$on("$stateChangeStart",
                function (event, next, params) {
                    if (AuthService.isAuthenticated) {
                        if (next.name) {
                            if (!AuthService.getIsActive() && next.url != '/settings') {
                                $state.go('settings', { isRedirected: true });

                                event.preventDefault();
                            }

                            if (next.url === '/signin') {
                                $state.go('feed');
                                event.preventDefault();
                            } else if (next.url === '/signup') {
                                $state.path('feed');
                                event.preventDefault();
                            }
                        }
                    } else {
                        if (next.name) {
                            if (next.url === '/settings') {
                                $state.go('signin');
                                event.preventDefault();
                            }
                        }
                    }
                });
        }
    ]);