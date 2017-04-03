(function() {
    'use strict';

    angular.module('photocloud')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope', '$state', '$stateParams', 'toast', 'settingsService', 'uploadService', 'authService', 'pageService'];


    function SettingsController($scope, $state, $stateParams, toast, settingsService, uploadService, authService, pageService) {
        var vm = this;

        vm.isRedirected = $stateParams.isRedirected;

        vm.settings = {
            username: authService.username,
            fullName: authService.fullName,
            imageUri: authService.imageUri,
            bio: '',
            email: '',
            isPrivate: authService.isPrivate,
            isActive: authService.isActive
        };

        vm.password = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            error: ''
        }

        vm.pendingChanges = {
            profile: false,
            image: false,
            isPrivate: false,
            password: {
                valid: false
            },
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
                    toast.show('Account has been ' + (response.isActive ? 'activated' : 'deactivated'));
                    getAccountSettings();
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

                    toast.show('Profile has been updated!');
                },
                function(errorResponse) {
                    vm.profileSaveError = errorResponse.error.message;
                }
            );
        };

        vm.changeEmailAddress = function() {
            settingsService.changeEmailAddress(vm.settings)
                .then(function(response) {
                    toast.show('Email successfully updated');
                }, function(error) {
                    toast.show('Could not update email ' + error);
                });
        }

        vm.changePassword = function() {
            vm.password.error = '';
            pageService.isLoading = true;
            settingsService.changePassword(vm.password).then(
                function(response) {
                    pageService.isLoading = false;
                    vm.password = {};

                    toast.show('Your password has been updated!');
                },
                function(error) {
                    pageService.isLoading = false;
                    vm.password.error = error.message;
                });
        };

        vm.closeInfo = function() {
            vm.isRedirected = false;
        };

        vm.changePrivacy = function() {
            settingsService.savePrivacy(vm.settings.isPrivate).then(
                function(response) {
                    if (vm.settingsBackup.isPrivate != response.isPrivate) {
                        authService.isPrivate = response.isPrivate;
                        authService.setValue('isPrivate', response.isPrivate);

                        vm.settingsBackup.isPrivate = response.isPrivate;
                        vm.settings.isPrivate = response.isPrivate;
                    }

                    toast.show(vm.settings.isPrivate ? 'Privacy has been enabled!' : 'Privacy has been disabled!');
                });
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
            vm.password.error = '';
            vm.pendingChanges.password.valid = false;

            if (vm.password.newPassword &&
                vm.password.confirmPassword &&
                vm.password.newPassword.length >= 6 &&
                vm.password.confirmPassword.length >= 6 &&
                vm.password.newPassword === vm.password.confirmPassword) {
                vm.pendingChanges.password.valid = true;
            } else if (vm.password.newPassword &&
                vm.password.confirmPassword &&
                vm.password.newPassword.length >= 6 &&
                vm.password.confirmPassword.length >= 6 &&
                vm.password.newPassword !== vm.password.confirmPassword) {
                vm.pendingChanges.password.valid = false;
                vm.password.error = 'Passwords do not match';
            } else {
                vm.pendingChanges.password.valid = false;
            }

            if (vm.password.oldPassword && vm.password.oldPassword.length < 6 || !vm.password.oldPassword) {
                vm.pendingChanges.password.valid = false;
            }
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
                            vm.settings.imageUri = response.url;
                            vm.browsedFile.file = null;

                            changeProfilePicture(response.id);
                        },
                        function(error) {
                            vm.browsedFile.isUploading = false;
                            vm.browsedFile.file = null;
                        });
            }
        }

        function changeProfilePicture(attachmentId) {
            vm.updatingPicture = true;
            settingsService.changeProfilePicture(attachmentId)
                .then(
                    function(response) {
                        vm.updatingPicture = false;
                        toast.show('Account picture has been successfully updated');
                    },
                    function(error) {
                        vm.updatingPicture = false;
                    });
        }

        function getAccountSettings() {
            settingsService.getAccountSettings(authService.userId).then(
                function(response) {
                    pageService.isLoading = false;

                    updateSettings(response);
                    vm.settings = response;
                    vm.settingsBackup = angular.copy(response);
                },
                function(error) {
                    pageService.isLoading = false;
                });
        }

        vm.$onInit = function() {
            pageService.isLoading = true;
            getAccountSettings();
        };
    }
})();