angular.module('blogapp', ['ui.router', 'ngMaterial'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider', function ($stateProvider, $urlRouterProvider, $mdIconProvider) {
        $urlRouterProvider.otherwise('/feed');

        $stateProvider
            .state('feed', {
                url: '/feed',
                templateUrl: 'app/components/feed/feed.html',
                controller: 'FeedController'
            });

        $mdIconProvider.fontSet('md', 'material-icons');
    }]);