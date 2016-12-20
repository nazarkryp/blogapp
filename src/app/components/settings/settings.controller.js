angular.module('blogapp').controller('SettingsController', ['$scope', '$state', '$stateParams', '$mdToast', 'SettingsService', 'AuthService', 'PageService',
    function ($scope, $state, $stateParams, $mdToast, SettingsService, AuthService, PageService) {
        $scope.isRedirected = $stateParams.isRedirected;
        $scope.settings = {
            username: AuthService.username,
            fullName: AuthService.fullName,
            imageUri: AuthService.imageUri,
            bio: '',
            isPrivate: AuthService.isPrivate,
            isActive: AuthService.isActive
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

                    AuthService.isActive = response.isActive;
                    AuthService.setValue('isActive', response.isActive);

                    var message = 'Account has been ' + (response.isActive ? 'activated' : 'deactivated');

                    showToastNotification(message);
                }
            );
        };

        $scope.savePrivacy = function () {
            SettingsService.savePrivacy($scope.settings.isPrivate).then(
                function (response) {
                    if ($scope.settingsBackup.isPrivate != response.isPrivate) {
                        AuthService.isPrivate = response.isPrivate;
                        AuthService.setValue('isPrivate', response.isPrivate);

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
            PageService.isLoading = true;

            $scope.passwordChangeError = '';
            SettingsService.changePassword($scope.password).then(
                function (response) {
                    PageService.isLoading = false;

                    $scope.password.oldPassword = '';
                    $scope.password.newPassword = '';
                    $scope.password.confirmPassword = '';
                    $scope.passwordChanged();

                    showToastNotification('Your password has been updated!');
                }, function (errorResponse) {
                    $scope.passwordChangeError = errorResponse.message;
                    PageService.isLoading = false;
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
            if (!AuthService.isAuthenticated) {
                $state.go('signin');

                return;
            }

            PageService.isLoading = true;

            SettingsService.getAccountSettings(AuthService.userId).then(
                function (response) {
                    PageService.isLoading = false;

                    updateSettings(response);
                    $scope.settings = response;
                    $scope.settingsBackup = angular.copy(response);
                });
        };

        function showToastNotification(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        };

        function updateSettings(response) {
            if ($scope.settingsBackup.username != response.username) {
                AuthService.username = response.username;
                AuthService.setValue('username', response.username);
            }

            if ($scope.settingsBackup.imageUri != response.imageUri) {
                AuthService.imageUri = response.imageUri;
                AuthService.setValue('imageUri', response.imageUri);
            }

            if ($scope.settingsBackup.isPrivate != response.isPrivate) {
                AuthService.isPrivate = response.isPrivate;
                AuthService.setValue('isPrivate', response.isPrivate);
            }

            if ($scope.settingsBackup.isActive != response.isActive) {
                AuthService.isActive = response.isActive;
                AuthService.setValue('isActive', response.isActive);
            }

            $scope.settings = response;
            $scope.settingsBackup = angular.copy(response);
        }

        init();
    }]);