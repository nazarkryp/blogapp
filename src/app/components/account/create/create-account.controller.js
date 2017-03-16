(function () {
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
            confirmPassword: '',
            fullName: '',
            bio: '',
            isPrivate: '',
            attachment: {
            }
        };

        vm.signUp = function (account) {
            if (vm.attachment) {
                vm.account.attachment = vm.attachment;
            }

            accountService.signUp(vm.account).then(
                function (response) {
                    $state.go('signin');
                },
                function (error) {
                    vm.errorMessage = error.error_description;
                }
            );
        };

        vm.goBack = function () {
            vm.step = 1;
        }

        vm.browseAttachment = function () {
            uploadInput.click();
        };

        vm.continue = function () {
            vm.isLoading = true;

            accountService.checkIfUserExists(vm.account)
                .then(function (response) {
                    vm.isLoading = false;

                    vm.account.isUsernameValid = response.isUsernameValid;
                    vm.account.isEmailValid = response.isEmailValid;

                    if (response.isUsernameValid && response.isEmailValid) {
                        vm.step = 2;
                    }
                });
        };

        $scope.$watch("browsedFile.file", function (file) {
            if (file) {
                uploadImage(file);
            }
        });

        function uploadImage(file) {
            if (file) {
                vm.isUploading = true;

                uploadService.uploadFile(file)
                    .then(function (response) {
                        vm.isUploading = false;
                        vm.attachment = response;
                        vm.browsedFile.file = null;
                    },
                    function (error) {
                        vm.isUploading = false;
                        vm.browsedFile.file = null;
                    });
            }
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
