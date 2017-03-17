(function() {
    'use strict';

    angular.module('photocloud')
        .controller('CreateAccountController', CreateAccountController);

    CreateAccountController.$inject = ['$scope', '$state', '$mdDialog', 'accountService', 'uploadService'];

    function CreateAccountController($scope, $state, $mdDialog, accountService, uploadService) {
        var vm = this;

        vm.step = 1;

        vm.isLoading = false;
        vm.isUploading = false;
        vm.browsedFile = {
            file: null
        };

        vm.account = {
            username: '',
            isUsernameValid: true,
            email: '',
            isEmailValid: true,
            password: '',
            isPasswordValid: true,
            confirmPassword: '',
            isConfirmPasswordValid: true,
            fullName: '',
            bio: '',
            isPrivate: '',
            privacyPolicyChecked: false,
            attachment: {}
        }

        vm.createAccount = function(account) {
            if (vm.attachment) {
                vm.account.attachment = vm.attachment;
            }

            accountService.createAccount(vm.account).then(
                function(response) {
                    $state.go('signin');
                },
                function(error) {
                    vm.errorMessage = error.error_description;
                }
            );
        }

        vm.browseAttachment = function() {
            uploadInput.click();
        }

        vm.continue = function() {
            if (!validateStep1()) {
                return;
            }

            vm.isLoading = true;

            accountService.checkIfUserExists(vm.account)
                .then(function(response) {
                    vm.isLoading = false;

                    vm.account.isUsernameValid = response.isUsernameValid;
                    vm.account.isEmailValid = response.isEmailValid;

                    if (response.isUsernameValid && response.isEmailValid) {
                        vm.step = 2;
                    }
                }, function(error) {
                    vm.isLoading = false;
                });
        }

        vm.goBack = function() {
            vm.step = 1;
        }

        function validateStep1() {
            vm.account.isUsernameValid = !(!vm.account.username || vm.account.username.length < 3);
            vm.account.isEmailValid = !(!vm.account.email || vm.account.email < 3);
            vm.account.isPasswordValid = !(!vm.account.password || vm.account.password.length < 6);
            vm.account.isConfirmPasswordValid = !(vm.account.isPasswordValid && (vm.account.password !== vm.account.confirmPassword));

            return (vm.account.isPasswordValid && vm.account.isConfirmPasswordValid && vm.account.isPasswordValid && vm.account.isConfirmPasswordValid && vm.account.privacyPolicyChecked);
        }

        $scope.$watch("vm.browsedFile.file", function(file) {
            if (file) {
                uploadImage(file);
            }
        })

        function uploadImage(file) {
            if (file) {
                vm.isUploading = true;

                uploadService.uploadFile(file)
                    .then(function(response) {
                            vm.isUploading = false;
                            vm.attachment = response;
                            vm.browsedFile.file = null;
                        },
                        function(error) {
                            vm.isUploading = false;
                            vm.browsedFile.file = null;
                        });
            }
        }

        function showLoadingDialog() {
            $mdDialog.show({
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        }
    }
})();