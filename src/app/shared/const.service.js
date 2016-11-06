angular.module('blogapp')
    .constant('BASE_ADDRESS', 'https://kryptogram.azurewebsites.net/')
    .service("ConstService", ["BASE_ADDRESS", function (BASE_ADDRESS) {
        this.baseAddress = BASE_ADDRESS;
    }]);