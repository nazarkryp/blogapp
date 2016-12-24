angular.module('blogapp').controller('ExplorePeopleController', ['$scope', '$state', '$stateParams', 'PeopleService', 'UserService', 'AuthService', 'PageService',
    function ($scope, $state, $stateParams, PeopleService, UserService, AuthService, PageService) {
        $scope.currentUserId = AuthService.userId;
        $scope.group = {
            users: [],
            hasMoreItems: false,
            pageIndex: 0,
            pageSize: 10
        };

        $scope.loadMore = function () {
            getUsers();
        };

        $scope.invertRelationshipsWithUser = function (user) {
            UserService.invertRelationshipsWithUser(user.id).then(
                function (response) {
                    user.relationships.outgoingStatus = response;
                },
                function (error) {
                    console.log(error);
                });
        };

        function getUsers() {
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
            PageService.title = 'Photocloud - Discover People';
            getUsers();
        };

        init();
    }]);
