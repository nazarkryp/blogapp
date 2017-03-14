angular.module('blogapp').controller('SettingsController', ['$scope', '$state', '$stateParams', '$mdToast', 'SettingsService', 'authService', 'pageService',
    function ($scope, $state, $stateParams, $mdToast, SettingsService, authService, pageService) {
        $scope.isRedirected = $stateParams.isRedirected;
        $scope.settings = {
            username: authService.username,
            fullName: authService.fullName,
            imageUri: authService.imageUri,
            bio: '',
            isPrivate: authService.isPrivate,
            isActive: authService.isActive
        };

        $scope.password = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }

        $scope.pendingChanges = {
            profile: false,
            image: false,
            isPrivate: false,
            password: false,
        };

        $scope.settingsBackup = {};
        $scope.pageCenter = window.innerHeight / 2;

        $scope.invertAccountStatus = function () {
            SettingsService.invertAccountStatus().then(
                function (response) {
                    $scope.settings.isActive = response.isActive;
                    $scope.settingsBackup.isActive = response.isActive;

                    authService.isActive = response.isActive;
                    authService.setValue('isActive', response.isActive);

                    var message = 'Account has been ' + (response.isActive ? 'activated' : 'deactivated');

                    showToastNotification(message);
                }
            );
        };

        $scope.savePrivacy = function () {
            SettingsService.savePrivacy($scope.settings.isPrivate).then(
                function (response) {
                    if ($scope.settingsBackup.isPrivate != response.isPrivate) {
                        authService.isPrivate = response.isPrivate;
                        authService.setValue('isPrivate', response.isPrivate);

                        $scope.settingsBackup.isPrivate = response.isPrivate;
                        $scope.settings.isPrivate = response.isPrivate;
                    }

                    $scope.privacyChanged();

                    showToastNotification('Privacy has been changed!');
                });
        };

        $scope.updateProfile = function () {
            var profile = {
                username: $scope.settings.username,
                fullName: $scope.settings.fullName,
                bio: $scope.settings.bio
            };

            $scope.profileSaveError = '';

            SettingsService.updateProfile(profile).then(
                function (response) {
                    $scope.settingsBackup.username = response.username;
                    $scope.settingsBackup.fullName = response.fullName;
                    $scope.settingsBackup.bio = response.bio;
                    $scope.profileChanged();

                    showToastNotification('Profile has been updated!');
                },
                function (errorResponse) {
                    $scope.profileSaveError = errorResponse.error.message;
                }
            );
        };

        $scope.resetProfileChanges = function () {
            $scope.settings.username = $scope.settingsBackup.username;
            $scope.settings.fullName = $scope.settingsBackup.fullName;
            $scope.settings.bio = $scope.settingsBackup.bio;
            $scope.profileChanged();
        };

        $scope.changePassword = function () {
            pageService.isLoading = true;

            $scope.passwordChangeError = '';
            SettingsService.changePassword($scope.password).then(
                function (response) {
                    pageService.isLoading = false;

                    $scope.password.oldPassword = '';
                    $scope.password.newPassword = '';
                    $scope.password.confirmPassword = '';
                    $scope.passwordChanged();

                    showToastNotification('Your password has been updated!');
                }, function (errorResponse) {
                    $scope.passwordChangeError = errorResponse.message;
                    pageService.isLoading = false;
                });
        };

        $scope.closeInfo = function () {
            $scope.isRedirected = false;
        };

        $scope.privacyChanged = function () {
            $scope.pendingChanges.isPrivate = ($scope.settingsBackup.isPrivate !== $scope.settings.isPrivate);
        };

        $scope.imageChanged = function () {
            $scope.pendingChanges.image = $scope.settingsBackup.image !== $scope.settings.image;
        };

        $scope.profileChanged = function () {
            $scope.pendingChanges.profile = $scope.settingsBackup.username !== $scope.settings.username
                || $scope.settingsBackup.fullName != $scope.settings.fullName
                || $scope.settingsBackup.bio != $scope.settings.bio;

            $scope.profileSaveError = '';
        };

        $scope.passwordChanged = function () {
            $scope.pendingChanges.password = (
                $scope.password.oldPassword !== ''
                && $scope.password.newPassword !== ''
                && $scope.password.confirmPassword !== ''
                && $scope.password.newPassword === $scope.password.confirmPassword);
        };

        var init = function () {
            if (!authService.isAuthenticated) {
                $state.go('signin');

                return;
            }

            pageService.isLoading = true;

            SettingsService.getAccountSettings(authService.userId).then(
                function (response) {
                    pageService.isLoading = false;

                    updateSettings(response);
                    $scope.settings = response;
                    $scope.settingsBackup = angular.copy(response);
                });
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
            if ($scope.settingsBackup.username != response.username) {
                authService.username = response.username;
                authService.setValue('username', response.username);
            }

            if ($scope.settingsBackup.imageUri != response.imageUri) {
                authService.imageUri = response.imageUri;
                authService.setValue('imageUri', response.imageUri);
            }

            if ($scope.settingsBackup.isPrivate != response.isPrivate) {
                authService.isPrivate = response.isPrivate;
                authService.setValue('isPrivate', response.isPrivate);
            }

            if ($scope.settingsBackup.isActive != response.isActive) {
                authService.isActive = response.isActive;
                authService.setValue('isActive', response.isActive);
            }

            $scope.settings = response;
            $scope.settingsBackup = angular.copy(response);
        }

        init();
    }]);