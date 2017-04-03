angular.module('photocloud')
    // .constant('BASE_ADDRESS', 'http://localhost:36776/')
    .constant('BASE_ADDRESS', 'https://kryptogram.azurewebsites.net/')
    .constant('RELATIONSHIPS', {
        Following: 'Following',
        NotFollowing: 'Follow'
    })
    .service("constService", ["BASE_ADDRESS", function(BASE_ADDRESS) {
        this.baseAddress = BASE_ADDRESS;
    }]);