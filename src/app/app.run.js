(function() {
    'use strict';

    angular.module('photocloud')
        .run(run);

    run.$inject = ['$rootScope', '$state', 'authService', 'pageService'];

    function run($rootScope, $state, authService, pageService) {
        $rootScope.$on("$stateChangeStart", stateChangeStart);

        function stateChangeStart(event, next, params) {
            if (authService.isAuthenticated) {
                if (next.url !== '/settings' && !authService.getIsActive()) {
                    $state.go('settings', { isRedirected: true });
                    event.preventDefault();
                } else if (next.url === '/signin' || next.url === '/signup') {
                    $state.go('feed');
                    event.preventDefault();
                }
            } else if (next.url !== '/signin' && next.url === '/') {
                $state.go('signin');
                event.preventDefault();
            }

            //pageService.navbarVisible = !(next.url === '/signin');
        }
    }
})();