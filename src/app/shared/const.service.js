angular.module('blogapp')
    .constant('BASE_ADDRESS', 'https://kryptogram.azurewebsites.net/')
    // .constant('BASE_ADDRESS', 'http://localhost:36776/')
    .service("ConstService", ["BASE_ADDRESS", function (BASE_ADDRESS) {
        this.baseAddress = BASE_ADDRESS;
    }]);