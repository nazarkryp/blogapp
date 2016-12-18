angular.module('blogapp').controller('SettingsController', ['$scope', '$state', '$stateParams', 'SettingsService', 'AuthService', function ($scope, $state, $stateParams, SettingsService, AuthService) {
    $scope.isRedirected = $stateParams.isRedirected;
    $scope.settings = {
        username: AuthService.username,
        imageUri: AuthService.imageUri,
        isPrivate: AuthService.isPrivate,
        isActive: AuthService.isActive
    };

    $scope.password = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    $scope.pendingChanges = {
        username: false,
        image: false,
        isPrivate: false,
        password: false,
    };

    $scope.settingsBackup = {};
    $scope.pageCenter = window.innerHeight / 2;

    $scope.invertAccountStatus = function () {
        SettingsService.invertAccountStatus().then(
            function (response) {
                $scope.accountActionName = response.isActive ? 'DEACTIVATE ACCOUNT' : 'ACTIVATE ACCOUNT';
                AuthService.updateValue('isActive', response.isActive);
            }
        );
    };

    $scope.saveAccountSettings = function () {
        $scope.isSavingChanges = true;
        SettingsService.saveAccountSettings($scope.settings).then(
            function (response) {
                $scope.isSavingChanges = false;

                updateSettings(response);
                $scope.settingsChanged();
            },
            function (error) {
                $scope.isSavingChanges = false;
            }
        );
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

    $scope.usernameChanged = function () {
        $scope.pendingChanges.username = $scope.settingsBackup.username !== $scope.settings.username;
    };

    $scope.passwordChanged = function () {
        $scope.pendingChanges.password = (
            $scope.password.oldPassword !== ''
            && $scope.password.newPassword !== ''
            && $scope.password.confirmPassword !== '')
            && ($scope.pendingChanges.password = $scope.password.newPassword === $scope.password.confirmPassword);
    };

    var init = function () {
        if (!AuthService.isAuthenticated) {
            $state.go('signin');

            return;
        }

        $scope.isLoading = true;

        SettingsService.getAccountSettings(AuthService.userId).then(
            function (response) {
                $scope.isLoading = false;

                $scope.settings = response;
                $scope.settingsBackup = angular.copy(response);

                $scope.accountActionName = response.isActive ? 'DEACTIVATE ACCOUNT' : 'ACTIVATE ACCOUNT';
            });
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