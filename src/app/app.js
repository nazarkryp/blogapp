angular.module('blogapp', ['ui.router', 'ngMaterial'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $mdIconProvider, $httpProvider) {
            $urlRouterProvider.otherwise('/feed');

            $stateProvider
                .state('feed', {
                    url: '/feed',
                    templateUrl: 'app/components/feed/feed.html',
                    controller: 'FeedController'
                })
                .state('signin', {
                    url: '/signin',
                    templateUrl: 'app/components/signin/signin.html',
                    controller: 'SignInController'
                });;

            $httpProvider.interceptors.push("authInterpretatorService");
        }])
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
    ]);