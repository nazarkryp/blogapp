angular.module('blogapp')
    .controller('UserInfoController', ['$scope', 'UserService', 'AuthService',
        function ($scope, UserService, AuthService) {
            $scope.isLoading = false;

            $scope.userInfo = {
                User: {
                    Username: 'nazarkryp'
                },
                IsFollowed: false,
                Posts: 0,
                Followers: 0,
                Follows: 0
            };

            var getUserInfo = function (userId) {
                $scope.isLoading = true;

                UserService.getRelationships(userId).then(
                    function (response) {
                        $scope.userInfo = response;
                        $scope.isLoading = false;
                    },
                    function (error) {
                        $scope.isLoading = false;
                        console.log(error);
                    }
                );
            };

            var init = function () {
                var userId = $scope.$ctrl.userid;

                if (userId) {
                    getUserInfo(userId);
                }
            };

            init();
        }]);