angular.module('blogapp').controller('IndexController', ['$scope', '$state', '$mdDialog', 'AuthService',
    function ($scope, $state, $mdDialog, AuthService) {
        $scope.AuthService = AuthService;
        $scope.isAuthenticated = false;
        $scope.username = '';

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

        $scope.$watch("AuthService.Authenticated",
            function (value) {
                $scope.isAuthenticated = value;

                if (value) {
                    $scope.username = AuthService.Username;
                } else {
                    $scope.username = '';
                }
            });

        $scope.signOut = function () {
            AuthService.signOut();
        };
    }]);