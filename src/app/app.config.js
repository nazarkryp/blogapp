angular.module('blogapp')
    .config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $mdIconProvider, $httpProvider) {
            $stateProvider
                .state('feed', {
                    url: '/',
                    templateUrl: 'app/components/feed/self/feed.html',
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
                .state('settings', {
                    url: '/settings',
                    params: {
                        isRedirected: false
                    },
                    templateUrl: 'app/components/settings/settings.html',
                    controller: 'SettingsController'
                })
                .state('explore.users', {
                    url: '/explore/people',
                    templateUrl: 'app/components/users/users.html',
                    controller: 'UsersController'
                })
                .state('explore.tags', {
                    url: '/explore/tags/:tag',
                    templateUrl: 'app/components/users/users.html',
                    controller: 'UsersController'
                })
                .state('userfeed', {
                    url: '/:username',
                    templateUrl: 'app/components/feed/users/feed.html',
                    controller: 'UsersFeedController'
                })
                .state('post', {
                    url: '/p/:postId',
                    templateUrl: 'app/components/post-details/post-details.html',
                    controller: 'PostDetailsController'
                });

            $urlRouterProvider.otherwise('/');
            $httpProvider.interceptors.push("authInterpretatorService");
        }]);