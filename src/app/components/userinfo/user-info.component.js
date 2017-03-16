angular.module('photocloud')
    .component('userInfo', {
        templateUrl: 'app/components/userinfo/user-info.html',
        controller: 'UserInfoController',
        bindings: {
            user : '='
        }
    });