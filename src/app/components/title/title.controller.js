angular.module('blogapp').controller('TitleController', ['$rootScope', '$scope', '$state', 'PageService',
    function ($rootScope, $scope, $state, PageService) {
        $scope.pageService = PageService;
        $rootScope.$state = $state;

        $scope.page = {
            title: ''
        };

        $scope.$watch('pageService.title', function (title) {
            $scope.page.title = title;
        });
    }]);