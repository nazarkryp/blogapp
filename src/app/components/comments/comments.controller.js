(function() {
    'use strict';

    angular.module('photocloud')
        .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['commentService'];

    function CommentsController(commentService) {
        var vm = this;

        vm.getComments = function(post) {
            commentService.getComments(post.id).then(
                function(response) {
                    vm.post.comments = response;
                });
        }
    }
})();