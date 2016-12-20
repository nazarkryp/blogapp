angular.module('blogapp')
    .controller('UserInfoController', ['$scope', 'UserService', 'AuthService', 'RELATIONSHIPS',
        function ($scope, UserService, AuthService, RELATIONSHIPS) {
            $scope.currentUserName = AuthService.username;
            $scope.user = $scope.$ctrl.user;

            $scope.invertRelationshipsWithUser = function () {
                UserService.invertRelationshipsWithUser($scope.user.id).then(
                    function (response) {
                        $scope.user.relationshipStatus = response;

                        if (response == 'None') {
                            $scope.user.counters.followers--;
                        } else if ('Followed') {
                            $scope.user.counters.followers++;
                        }
                    });
            };
        }]);