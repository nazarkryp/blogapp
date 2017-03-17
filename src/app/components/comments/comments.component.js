(function() {
    'use strict';

    angular.module('photocloud')
        .component('comments', {
            templateUrl: 'app/components/comments/comments.html',
            controller: 'CommentsController',
            controllerAs: 'vm',
            bindings: {
                post: '='
            }
        });
})();