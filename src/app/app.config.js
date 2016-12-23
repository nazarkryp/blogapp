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
                .state('explore', {
                    abstract: true,
                    url: '/explore',
                    templateUrl: 'app/components/explore/explore.html',
                    controller: 'ExploreController',
                    controllerAs: 'vm'
                })
                .state('explore.people', {
                    url: '/people',
                    templateUrl: 'app/components/explore/people/explore.people.html',
                    controller: 'ExplorePeopleController'
                })
                .state('explore.tags', {
                    url: '/tags/:tag',
                    templateUrl: 'app/components/explore/tags/explore.tags.html',
                    controller: 'ExploreTagsController',
                    controllerAs: 'vm'
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