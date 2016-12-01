angular.module('blogapp')
    .constant('BASE_ADDRESS', 'http://localhost:36776/')
    // .constant('BASE_ADDRESS', 'https://kryptogram.azurewebsites.net/')
    .constant('RELATIONSHIPS', {
        Following: 'Following',
        NotFollowing: 'Follow'
    })
    .constant('DATEIDENTIFIERS', {
        Weeks: 'weeks',
        Week: 'week',
        Days: 'days',
        Day: 'day',
        Hours: 'hours',
        Hour: 'hour',
        Minutes: 'minutes',
        Minute: 'minute',
        Seconds: 'seconds',
        Second: 'second'
    })
    // .constant('BASE_ADDRESS', 'http://localhost:36776/')
    .service("ConstService", ["BASE_ADDRESS", function (BASE_ADDRESS) {
        this.baseAddress = BASE_ADDRESS;
    }]);