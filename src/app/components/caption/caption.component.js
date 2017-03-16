(function () {
    'use strict';

    angular.module('photocloud')
        .component('postCaption', {
            templateUrl: 'app/components/caption/caption.html',
            controllerAs: 'vm',
            bindings: {
                post: '='
            }
        });
})();
