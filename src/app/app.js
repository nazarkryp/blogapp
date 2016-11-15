angular.module('blogapp', ['ui.router', 'ngMaterial', 'ngMessages'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $mdIconProvider, $httpProvider) {
            $stateProvider
                .state('feed', {
                    url: '/feed',
                    templateUrl: 'app/components/feed/feed.html',
                    controller: 'FeedController'
                })
                .state('usersfeed', {
                    url: '/feed/users/:id',
                    templateUrl: 'app/components/feed/users/users-feed.html',
                    controller: 'FeedController'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'app/components/signup/signup.html',
                    controller: 'SignUpController'
                })
                .state('signin', {
                    url: '/signin',
                    templateUrl: 'app/components/signin/signin.html',
                    controller: 'SignInController'
                });

            $urlRouterProvider.otherwise('/feed');
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