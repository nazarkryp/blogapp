angular.module('photocloud').controller('TitleController', ['$rootScope', '$scope', '$state', 'pageService',
    function ($rootScope, $scope, $state, pageService) {
        $scope.pageService = pageService;
        $rootScope.$state = $state;

        $scope.page = {
            title: ''
        };

        $scope.$watch('pageService.title', function (title) {
            $scope.page.title = title;
        });
    }]);