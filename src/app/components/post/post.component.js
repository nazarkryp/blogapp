angular.module('photocloud').component('post', {
    templateUrl: 'app/components/post/post.html',
    controller: 'PostController',
    controllerAs: 'vm',
    bindings: {
        post: '=',
        removeCallback: '&'
    }
});