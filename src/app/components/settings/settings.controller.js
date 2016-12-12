angular.module('blogapp').controller('SettingsController', ['$scope', 'SettingsService', 'AuthService', function($scope, SettingsService, AuthService) {
    $scope.settings = {
        username: AuthService.username,
        imageUri: AuthService.imageUri,
        isPrivate: false
    };

    $scope.invertAccountStatus = function() {
        SettingsService.invertAccountStatus().then(
            function(response) {
                $scope.accountActionName = response.isActive ? 'DEACTIVATE ACCOUNT' : 'ACTIVATE ACCOUNT';
            }
        );
    };

    $scope.saveAccountSettings = function() {
        SettingsService.saveAccountSettings($scope.settings).then(
            function(response) {
            },
            function(error) {
            }
        );
    };

    var init = function() {
        $scope.isLoading = true;

        SettingsService.getAccountSettings(AuthService.userId).then(
            function(response) {
                $scope.isLoading = false;
                $scope.settings = response;
                AuthService.isActive = response.isActive;
                $scope.accountActionName = response.isActive ? 'DEACTIVATE ACCOUNT' : 'ACTIVATE ACCOUNT';
            });
    };

    init();
}]);