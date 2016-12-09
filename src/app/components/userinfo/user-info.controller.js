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
                        $scope.relationshipStatus = response.outgoingStatus;
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
                            $scope.relationshipStatus = response;
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