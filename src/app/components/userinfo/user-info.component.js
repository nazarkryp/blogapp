angular.module('blogapp')
    .component('userInfo', {
        templateUrl: 'app/components/userinfo/user-info.html',
        controller: 'UserInfoController',
        bindings: {
            userid: '=',
            username : '='
        }
    });