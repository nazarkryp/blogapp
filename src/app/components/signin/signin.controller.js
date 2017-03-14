angular.module('blogapp')
    .controller('SignInController', ['$scope', '$state', '$mdDialog', 'SignInService', 'authService',
        function ($scope, $state, $mdDialog, SignInService, authService) {
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
                        authService.signIn(response);
                        $state.go('feed');
                    }, function (error) {
                        $scope.isLoading = false;
                        $scope.errorMessage = error.error_description;
                        $mdDialog.hide();
                    });

                credentials = {};
            };

            $scope.gotoCreateAccountPage = function () {
                $state.go('signup');
            };

            var showLoadingDialog = function () {
                $mdDialog.show({
                    contentElement: '#myDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                });
            };
        }]);