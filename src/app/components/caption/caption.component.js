(function () {
    'use strict';

    angular.module('blogapp')
        .component('postCaption', {
            templateUrl: 'app/components/caption/caption.html',
            controllerAs: 'vm',
            bindings: {
                post: '='
            }
        });
})();
