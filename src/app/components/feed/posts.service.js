angular.module('blogapp').service('PostsService', ['$q', 'HttpService', 'ConstService', function ($q, HttpService, ConstService) {
    this.getPosts = function (userId) {
        var deferred = $q.defer();

        if (!userId) {
            HttpService.get(ConstService.baseAddress + 'api/posts', deferred);
        } else {
            HttpService.get(ConstService.baseAddress + 'api/posts?userId=' + userId, deferred);
        }

        return deferred.promise;
    };

    this.getComments = function (postId) {
        var deferred = $q.defer();

        HttpService.get(ConstService.baseAddress + 'api/comments?postId=' + postId, deferred);

        return deferred.promise;
    };

    this.postComment = function (comment, postId) {
        var deferred = $q.defer();

        HttpService.post(ConstService.baseAddress + 'api/comments?postId=' + postId, comment, deferred);

        return deferred.promise;
    };

    this.like = function (postId) {
        var deferred = $q.defer();

        HttpService.post(ConstService.baseAddress + 'api/posts/like?postId=' + postId, null, deferred);

        return deferred.promise;
    };
}]);