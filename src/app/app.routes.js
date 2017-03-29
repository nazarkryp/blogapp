(function() {
    'use strict';

    angular.module('photocloud')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$mdIconProvider', '$httpProvider'];

    function stateConfig($stateProvider, $urlRouterProvider, $mdIconProvider, $httpProvider) {
        $stateProvider
            .state('feed', {
                url: '/',
                templateUrl: 'app/components/posts/feed/posts.html',
                controller: 'FeedController',
                controllerAs: 'vm'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/components/account/create/create-account.html',
                controller: 'CreateAccountController',
                controllerAs: 'vm'
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/components/account/signin/signin.html',
                controller: 'SignInController',
                controllerAs: 'vm'
            })
            .state('settings', {
                url: '/settings',
                params: {
                    isRedirected: false
                },
                templateUrl: 'app/components/settings/settings.html',
                controller: 'SettingsController',
                controllerAs: 'vm'
            })
            .state('explore', {
                abstract: true,
                url: '/explore',
                templateUrl: 'app/components/explore/explore.html',
                controller: 'ExploreController',
                controllerAs: 'pvm'
            })
            .state('explore.people', {
                url: '/people',
                templateUrl: 'app/components/explore/people/explore.people.html',
                controller: 'ExplorePeopleController',
                controllerAs: 'vm'
            })
            .state('explore.tags', {
                url: '/tags/:tag',
                templateUrl: 'app/components/explore/tags/explore.tags.html',
                controller: 'ExploreTagsController',
                controllerAs: 'vm'
            })
            .state('fullscreen', {
                url: '/image/:url',
                templateUrl: 'app/components/fullscreen/fullscreen.html',
                controller: 'FullScreenController',
                controllerAs: 'vm'
            })
            // .state('404', {
            //     url: '/404',
            //     templateUrl: 'app/components/404/404.html'
            // })
            .state('userfeed', {
                url: '/:username',
                templateUrl: 'app/components/posts/user-posts/user-posts.html',
                controller: 'UserFeedController',
                controllerAs: 'vm'
            })
            .state('post', {
                url: '/p/:postId',
                templateUrl: 'app/components/post-details/post-details.html',
                controller: 'PostDetailsController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push("authInterpretatorService");
    };
})();