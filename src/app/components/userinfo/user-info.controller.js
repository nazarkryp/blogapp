angular.module('photocloud')
    .controller('UserInfoController', ['$scope', 'userService', 'authService', 'RELATIONSHIPS',
        function($scope, userService, authService, RELATIONSHIPS) {
            $scope.currentUserName = authService.username;
            $scope.user = $scope.$ctrl.user;

            $scope.invertRelationshipsWithUser = function() {
                userService.invertRelationshipsWithUser($scope.user.id).then(
                    function(response) {
                        $scope.user.relationshipStatus = response;

                        if (response == 'None') {
                            $scope.user.counters.followers--;
                        } else if ('Followed') {
                            $scope.user.counters.followers++;
                        }
                    });
            };
        }
    ]);