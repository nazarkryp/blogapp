angular.module('blogapp').controller('SettingsController', ['$scope', '$state', 'SettingsService', 'AuthService', function ($scope, $state, SettingsService, AuthService) {
    $scope.settings = {
        username: AuthService.username,
        imageUri: AuthService.imageUri,
        isPrivate: false
    };

    $scope.invertAccountStatus = function () {
        SettingsService.invertAccountStatus().then(
            function (response) {
                $scope.accountActionName = response.isActive ? 'DEACTIVATE ACCOUNT' : 'ACTIVATE ACCOUNT';

                AuthService.isActive = Boolean(response.isActive);
                AuthService.updateValue('isActive', response.isActive);
            }
        );
    };

    $scope.saveAccountSettings = function () {
        SettingsService.saveAccountSettings($scope.settings).then(
            function (response) {
            },
            function (error) {
            }
        );
    };

    var init = function () {
        if (!AuthService.authenticated) {
            $state.go('signin');

            return;
        }

        $scope.isLoading = true;

        SettingsService.getAccountSettings(AuthService.userId).then(
            function (response) {
                $scope.isLoading = false;
                $scope.settings = response;

                AuthService.isActive = Boolean(response.isActive);
                AuthService.updateValue('isActive', response.isActive);
                
                $scope.accountActionName = response.isActive ? 'DEACTIVATE ACCOUNT' : 'ACTIVATE ACCOUNT';
            });
    };

    init();
}]);