angular.module('photocloud').service('ErrorsService', ['$mdDialog', function ($mdDialog) {
    this.showErrorMessage = function (message) {
        var error = {
            title : 'error title',
            message : message
        };
        
        $mdDialog.show({
            controller: 'ErrorController',
            templateUrl: 'app/components/errors/error-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: '-sm',
            locals: {
                error: error
            }
        });
    };
}]);