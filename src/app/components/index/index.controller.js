angular.module('blogapp').controller('IndexController', ['$scope', '$state', '$mdDialog', 'AuthService', 'UserService',
    function ($scope, $state, $mdDialog, AuthService, UserService) {
        $scope.AuthService = AuthService;
        $scope.isAuthenticated = false;

        $scope.gotoSignInPage = function () {
            $state.go('signin');
        };

        $scope.gotoSignUpPage = function () {
            $state.go('signup');
        };

        $scope.gotoFeedPage = function () {
            $state.go('feed');
        };

        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $scope.$watch("AuthService.authenticated",
            function (value) {
                $scope.isAuthenticated = value;

                if (value) {
                    getAuthenticatedUser();
                } else {
                    $scope.user = null;
                }
            });

        $scope.signOut = function () {
            AuthService.signOut();
        };

        var getAuthenticatedUser = function () {
            $scope.user = {
                userId: AuthService.userId,
                username: AuthService.username,
                imageUri: AuthService.imageUri
            };
        };
    }]);