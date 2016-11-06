angular.module('blogapp').controller('SignInController', ['$scope', '$state', 'SignInService', 'AuthService',
    function ($scope, $state, SignInService, AuthService) {
        $scope.signIn = function (credentials) {
            SignInService.signIn(credentials).then(
                function (response) {
                    AuthService.signIn(response);
                    $state.go('feed');
                }, function (error) {
                    console.log(error);
                });

            credentials = {};
        };
    }]);