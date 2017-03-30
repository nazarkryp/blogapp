(function() {
    'use strict';

    angular.module('photocloud')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$state', '$stateParams', '$mdToast', 'settingsService', 'authService', 'pageService'];


    function SettingsController($state, $stateParams, $mdToast, settingsService, authService, pageService) {
        var vm = this;

        vm.isRedirected = $stateParams.isRedirected;
        vm.settings = {
            username: authService.username,
            fullName: authService.fullName,
            imageUri: authService.imageUri,
            bio: '',
            isPrivate: authService.isPrivate,
            isActive: authService.isActive
        };

        vm.password = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }

        vm.pendingChanges = {
            profile: false,
            image: false,
            isPrivate: false,
            password: false,
        };

        vm.browsedFile = {
            isUploading: false,
            file: null
        };

        vm.settingsBackup = {};

        vm.invertAccountStatus = function() {
            settingsService.invertAccountStatus().then(
                function(response) {
                    vm.settings.isActive = response.isActive;
                    vm.settingsBackup.isActive = response.isActive;

                    authService.isActive = response.isActive;
                    authService.setValue('isActive', response.isActive);

                    var message = 'Account has been ' + (response.isActive ? 'activated' : 'deactivated');

                    showToastNotification(message);
                }
            );
        };

        vm.browseAttachment = function() {
            uploadInput.click();
        }

        $scope.$watch("vm.browsedFile.file", function(file) {
            if (file) {
                uploadImage(file);
            }
        });

        vm.updateProfile = function() {
            var profile = {
                username: vm.settings.username,
                fullName: vm.settings.fullName,
                bio: vm.settings.bio
            };

            vm.profileSaveError = '';

            settingsService.updateProfile(profile).then(
                function(response) {
                    vm.settingsBackup.username = response.username;
                    vm.settingsBackup.fullName = response.fullName;
                    vm.settingsBackup.bio = response.bio;
                    vm.profileChanged();

                    showToastNotification('Profile has been updated!');
                },
                function(errorResponse) {
                    vm.profileSaveError = errorResponse.error.message;
                }
            );
        };

        vm.resetProfileChanges = function() {
            vm.settings.username = vm.settingsBackup.username;
            vm.settings.fullName = vm.settingsBackup.fullName;
            vm.settings.bio = vm.settingsBackup.bio;
            vm.profileChanged();
        };

        vm.changePassword = function() {
            pageService.isLoading = true;

            vm.passwordChangeError = '';
            settingsService.changePassword(vm.password).then(
                function(response) {
                    pageService.isLoading = false;

                    vm.password.oldPassword = '';
                    vm.password.newPassword = '';
                    vm.password.confirmPassword = '';
                    vm.passwordChanged();

                    showToastNotification('Your password has been updated!');
                },
                function(errorResponse) {
                    vm.passwordChangeError = errorResponse.message;
                    pageService.isLoading = false;
                });
        };

        vm.closeInfo = function() {
            vm.isRedirected = false;
        };

        vm.savePrivacy = function() {
            settingsService.savePrivacy(vm.settings.isPrivate).then(
                function(response) {
                    if (vm.settingsBackup.isPrivate != response.isPrivate) {
                        authService.isPrivate = response.isPrivate;
                        authService.setValue('isPrivate', response.isPrivate);

                        vm.settingsBackup.isPrivate = response.isPrivate;
                        vm.settings.isPrivate = response.isPrivate;
                    }

                    //vm.privacyChanged();

                    showToastNotification(vm.settings.isPrivate ? 'Privacy has been enabled!' : 'Privacy has been disabled!');
                });
        };

        vm.privacyChanged = function() {
            //vm.pendingChanges.isPrivate = (vm.settingsBackup.isPrivate !== vm.settings.isPrivate);

            vm.savePrivacy();
        };

        vm.imageChanged = function() {
            vm.pendingChanges.image = vm.settingsBackup.image !== vm.settings.image;
        };

        vm.profileChanged = function() {
            vm.pendingChanges.profile = vm.settingsBackup.username !== vm.settings.username ||
                vm.settingsBackup.fullName != vm.settings.fullName ||
                vm.settingsBackup.bio != vm.settings.bio;

            vm.profileSaveError = '';
        };

        vm.passwordChanged = function() {
            vm.pendingChanges.password = (
                vm.password.oldPassword !== '' &&
                vm.password.newPassword !== '' &&
                vm.password.confirmPassword !== '' &&
                vm.password.newPassword === vm.password.confirmPassword);
        };

        function showToastNotification(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position('bottom right')
                .hideDelay(3000)
            );
        };

        function updateSettings(response) {
            if (vm.settingsBackup.username != response.username) {
                authService.username = response.username;
                authService.setValue('username', response.username);
            }

            if (vm.settingsBackup.imageUri != response.imageUri) {
                authService.imageUri = response.imageUri;
                authService.setValue('imageUri', response.imageUri);
            }

            if (vm.settingsBackup.isPrivate != response.isPrivate) {
                authService.isPrivate = response.isPrivate;
                authService.setValue('isPrivate', response.isPrivate);
            }

            if (vm.settingsBackup.isActive != response.isActive) {
                authService.isActive = response.isActive;
                authService.setValue('isActive', response.isActive);
            }

            vm.settings = response;
            vm.settingsBackup = angular.copy(response);
        }

        function uploadImage(file) {
            if (file) {
                vm.browsedFile.isUploading = true;

                uploadService.uploadFile(file)
                    .then(function(response) {
                            vm.browsedFile.isUploading = false;
                            vm.account.attachment = response;
                            vm.browsedFile.file = null;
                        },
                        function(error) {
                            vm.browsedFile.isUploading = false;
                            vm.browsedFile.file = null;
                        });
            }
        }

        vm.$onInit = function() {
            if (!authService.isAuthenticated) {
                $state.go('signin');

                return;
            }

            pageService.isLoading = true;

            settingsService.getAccountSettings(authService.userId).then(
                function(response) {
                    pageService.isLoading = false;

                    updateSettings(response);
                    vm.settings = response;
                    vm.settingsBackup = angular.copy(response);
                });
        };
    }
})();