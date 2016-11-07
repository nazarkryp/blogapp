angular.module('blogapp').controller('SignInController', ['$scope', '$state', '$mdDialog', 'SignInService', 'AuthService',
    function ($scope, $state, $mdDialog, SignInService, AuthService) {
        $scope.isLoading = false;
        $scope.errorMessage = '';

        $scope.signIn = function (credentials) {
            $scope.errorMessage = '';
            $scope.isLoading = true;
            showLoadingDialog();

            SignInService.signIn(credentials).then(
                function (response) {
                    $mdDialog.hide();
                    $scope.isLoading = false;
                    AuthService.signIn(response);
                    $state.go('feed');
                }, function (error) {
                    $scope.isLoading = false;
                    $scope.errorMessage = error.error_description;
                    $mdDialog.hide();
                });

            credentials = {};
        };

        var showLoadingDialog = function () {
            $mdDialog.show({
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        };
    }]);