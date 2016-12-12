angular.module('blogapp').controller('UsersController', ['$scope', '$state', '$stateParams', 'UsersService', 'UserService', 'AuthService', function ($scope, $state, $stateParams, UsersService, UserService, AuthService) {
    $scope.currentUserId = AuthService.userId;
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
        UserService.invertRelationshipsWithUser(user.id).then(
            function (response) {
                user.relationships.outgoingStatus = response;
            },
            function (error) {
                console.log(error);
            });
    };

    function getUsers() {
        UsersService.getUsers($scope.group.pageIndex + 1, $scope.group.pageSize).then(
            function (response) {
                $scope.group.users = $scope.group.users.concat(response.items);
                $scope.group.pageIndex = response.pageIndex;
                $scope.group.hasMoreItems = response.hasMoreItems;
                $scope.isLoading = false;
            }, function (error) {
                console.log(error);
                $scope.isLoading = false;
            }
        );
    };

    var init = function () {
        $scope.isLoading = true;

        getUsers();
    };

    init();
}]);
