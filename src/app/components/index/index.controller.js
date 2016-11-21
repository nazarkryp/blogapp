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
                    $scope.user = {
                        username: AuthService.username
                    }
                    getUser(AuthService.userId);
                } else {
                    $scope.user = null;
                }
            });

        $scope.signOut = function () {
            AuthService.signOut();
        };

        var getUser = function (userId) {
            UserService.getUserById(userId).then(
                function (response) {
                    $scope.user = response;
                },
                function (error) {
                    console.log(error);
                }
            );
        };
    }]);