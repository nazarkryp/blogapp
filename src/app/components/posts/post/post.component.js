angular.module('photocloud').component('post', {
    templateUrl: 'app/components/posts/post/post.html',
    controller: 'PostController',
    controllerAs: 'vm',
    bindings: {
        post: '=',
        removeCallback: '&'
    }
});