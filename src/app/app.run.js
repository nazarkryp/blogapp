(function () {
    'use strict';

    angular.module('photocloud')
        .run(runBlock);

    runBlock.$inject = ["$rootScope", "$state", "authService"];

    function runBlock($rootScope, $state, authService) {
        $rootScope.$on("$stateChangeStart",
            function (event, next, params) {
                if (authService.isAuthenticated) {
                    if (next.name) {
                        if (!authService.getIsActive() && next.url != '/settings') {
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
    };
})();