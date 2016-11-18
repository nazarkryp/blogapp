angular.module('blogapp')
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
        }]);