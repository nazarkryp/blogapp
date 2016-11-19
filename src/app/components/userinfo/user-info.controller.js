angular.module('blogapp')
    .controller('UserInfoController', ['$scope', 'UserService', 'AuthService', 'RELATIONSHIPS',
        function ($scope, UserService, AuthService, RELATIONSHIPS) {
            $scope.isLoading = false;

            $scope.currentUserName = AuthService.Username;
            $scope.user = null;

            var getUser = function (username) {
                $scope.isLoading = true;

                UserService.getUserByName(username).then(
                    function (response) {
                        $scope.user = response;

                        if ($scope.currentUserName != $scope.user.Username) {
                            getRelationshipsStatus(response.Id);
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

                        if (response.IsFollowed) {
                            $scope.actionName = RELATIONSHIPS.Following;
                        } else {
                            $scope.actionName = RELATIONSHIPS.NotFollowing;
                        }
                    },
                    function (error) {
                        $scope.isLoading = false;
                        console.log(error);
                    }
                );
            };

            $scope.invertRelationshipsWithUser = function () {
                if ($scope.user.Id) {
                    UserService.invertRelationshipsWithUser($scope.user.Id).then(
                        function (response) {
                            $scope.isLoading = false;
                            if (response.IsFollowed) {
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