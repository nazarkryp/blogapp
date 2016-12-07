angular.module('blogapp')
    .controller('UserInfoController', ['$scope', 'UserService', 'AuthService', 'RELATIONSHIPS',
        function ($scope, UserService, AuthService, RELATIONSHIPS) {
            $scope.isLoading = false;

            $scope.currentUserName = AuthService.username;
            $scope.user = null;

            var getUser = function (username) {
                $scope.isLoading = true;

                UserService.getUserByName(username).then(
                    function (response) {
                        $scope.user = response;

                        if ($scope.currentUserName && $scope.user.username && $scope.currentUserName != $scope.user.username) {
                            getRelationshipsStatus(response.id);
                        } else {
                            $scope.isLoading = false;
                        }
                    },
                    function (error) {
                        $scope.isLoading = false;
                        console.log(error);
                    }
                );
            };

            var getRelationshipsStatus = function (userId) {
                UserService.getRelationshipsWithUser(userId).then(
                    function (response) {
                        $scope.isLoading = false;

                        if (response.isFollowedByUser) {
                            $scope.actionName = RELATIONSHIPS.Following;
                            $scope.user.followers++;
                        } else {
                            $scope.actionName = RELATIONSHIPS.NotFollowing;
                            $scope.user.followers--;
                        }
                    },
                    function (error) {
                        $scope.isLoading = false;
                        console.log(error);
                    }
                );
            };

            $scope.invertRelationshipsWithUser = function () {
                if ($scope.user.id) {
                    UserService.invertRelationshipsWithUser($scope.user.id).then(
                        function (response) {
                            $scope.isLoading = false;
                            if (response.isFollowed) {
                                $scope.actionName = RELATIONSHIPS.Following;
                            } else {
                                $scope.actionName = RELATIONSHIPS.NotFollowing;
                            }
                        },
                        function (error) {
                            console.log(error);
                        });
                }
            };

            var init = function () {
                var username = $scope.$ctrl.username;

                if (username) {
                    getUser(username);
                }
            };

            init();
        }]);