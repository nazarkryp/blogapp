angular.module('blogapp')
    .controller('SignUpController', ['$scope', '$state', '$mdDialog', 'SignUpService',
        function ($scope, $state, $mdDialog, SignUpService) {
            $scope.signUp = function (user) {
                showLoadingDialog();
                SignUpService.signUp(user).then(
                    function (response) {
                        $mdDialog.hide();
                        $state.go('signin');
                    },
                    function (error) {
                        $mdDialog.hide();
                        $scope.errorMessage = error.error_description;
                    }
                );
            };

            var showLoadingDialog = function () {
                $mdDialog.show({
                    contentElement: '#myDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                });
            };
        }]);