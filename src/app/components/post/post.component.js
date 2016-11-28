angular.module('blogapp').component('post', {
    templateUrl: 'app/components/post/post.html',
    controller: 'PostController',
    bindings: {
        post: '='
    }
});