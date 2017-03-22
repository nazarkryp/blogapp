(function() {
    'use strict';

    angular.module('photocloud')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$state', '$mdDialog', 'accountService', 'authService'];

    function SignInController($state, $mdDialog, accountService, authService) {
        var vm = this;

        vm.isLoading = false;
        vm.errorMessage = '';

        vm.account = {
            username: '',
            password: '',
            isUsernameValid: true,
            isPasswordValid: true
        };

        vm.signIn = function() {
            vm.errorMessage = '';
            vm.isLoading = true;

            accountService.signIn(vm.account).then(
                function(response) {
                    $mdDialog.hide();
                    vm.isLoading = false;
                    authService.signIn(response);
                    $state.go('feed');
                },
                function(error) {
                    vm.isLoading = false;
                    $mdDialog.hide();

                    if (error && error.error_description) {
                        vm.errorMessage = error.error_description;
                    } else {
                        vm.errorMessage = error;
                    }
                });
        };

        vm.gotoCreateAccountPage = function() {
            $state.go('signup');
        };

        function showLoadingDialog() {
            $mdDialog.show({
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        };
    }
})();