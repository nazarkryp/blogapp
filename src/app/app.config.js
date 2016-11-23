angular.module('blogapp')
    .config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $mdIconProvider, $httpProvider) {
            $stateProvider
                .state('feed', {
                    url: '/',
                    templateUrl: 'app/components/feed/feed.html',
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
                })
                .state('usersfeed', {
                    url: '/:username',
                    templateUrl: 'app/components/feed/users-feed.html',
                    controller: 'FeedController'
                })
                .state('post', {
                    url: '/p/:postId',
                    templateUrl: 'app/components/post/post-details.html'
                });

            $urlRouterProvider.otherwise('/');
            $httpProvider.interceptors.push("authInterpretatorService");
        }]);