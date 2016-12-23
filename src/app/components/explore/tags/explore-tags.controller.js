angular.module('blogapp').controller('ExploreTagsController', ['$scope', '$state', '$stateParams', 'PostsService', 'AuthService', 'PageService',
    function ($scope, $state, $stateParams, PostsService, UserService, AuthService, PageService) {
        $scope.currentUserId = AuthService.userId;
        $scope.group = {
            users: [],
            hasMoreItems: false,
            pageIndex: 0,
            pageSize: 5
        };

        $scope.loadMore = function () {
            getPosts();
        };

        function getPosts() {
            PageService.isLoading = true;

            PeopleService.getUsers($scope.group.pageIndex + 1, $scope.group.pageSize).then(
                function (response) {
                    $scope.group.users = $scope.group.users.concat(response.items);
                    $scope.group.pageIndex = response.pageIndex;
                    $scope.group.hasMoreItems = response.hasMoreItems;
                    PageService.isLoading = false;
                }, function (error) {
                    console.log(error);
                    PageService.isLoading = false;
                }
            );
        };

        var init = function () {
            PageService.title = $stateParams.tag + ' • ' + ' Photocloud';

            getPosts();
        };

        init();
    }]);
