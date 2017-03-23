(function() {
    'use strict';

    angular.module('photocloud')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$state', '$mdDialog', 'accountService', 'authService'];

    function SignInController($state, $mdDialog, accountService, authService) {
        var vm = this;

        vm.isLoading = false;
        vm.error = '';

        vm.account = {
            username: '',
            password: '',
            isUsernameValid: true,
            isPasswordValid: true
        };

        vm.signIn = function() {
            vm.error = '';
            vm.isLoading = true;

            accountService.signIn(vm.account).then(
                function(response) {
                    authService.signIn(response);
                    vm.isLoading = false;

                    $state.go('feed');
                },
                function(error) {
                    vm.isLoading = false;
                    vm.error = 'Sorry, your username or password was incorrect. Please check your username and password.';
                });
        };

        vm.gotoCreateAccountPage = function() {
            $state.go('signup');
        };
    }
})();