angular.module('blogapp', ['ui.router', 'ngMaterial'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/feed');

        $stateProvider
            .state('feed', {
                url: '/feed',
                templateUrl: 'app/components/feed/feed.html',
                controller: 'FeedController'
            });
    }]);