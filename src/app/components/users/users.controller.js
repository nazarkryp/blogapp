angular.module('photocloud').controller('UsersController', ['$scope', '$state', '$stateParams', 'peopleService', 'userService', 'authService', 'pageService',
    function ($scope, $state, $stateParams, peopleService, userService, authService, pageService) {
        $scope.currentUserId = authService.userId;
        $scope.group = {
            users: [],
            hasMoreItems: false,
            pageIndex: 0,
            pageSize: 5
        };

        $scope.loadMore = function () {
            getUsers();
        };

        $scope.invertRelationshipsWithUser = function (user) {
            userService.invertRelationshipsWithUser(user.id).then(
                function (response) {
                    user.relationships.outgoingStatus = response;
                },
                function (error) {
                    console.log(error);
                });
        };

        function getUsers() {
            pageService.isLoading = true;

            peopleService.getUsers($scope.group.pageIndex + 1, $scope.group.pageSize).then(
                function (response) {
                    $scope.group.users = $scope.group.users.concat(response.items);
                    $scope.group.pageIndex = response.pageIndex;
                    $scope.group.hasMoreItems = response.hasMoreItems;
                    pageService.isLoading = false;
                }, function (error) {
                    console.log(error);
                    pageService.isLoading = false;
                }
            );
        };

        var init = function () {
            pageService.title = 'Photocloud - Discover People';
            getUsers();
        };

        init();
    }]);
