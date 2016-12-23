angular.module('blogapp').service('PostsService', ['$q', 'HttpService', 'ConstService',
    function ($q, HttpService, ConstService) {
        this.createPost = function (post) {
            var deferred = $q.defer();

            HttpService.post(ConstService.baseAddress + 'api/posts', post, deferred);

            return deferred.promise;
        };

        this.createPostFromExternal = function (post) {
            var deferred = $q.defer();

            HttpService.post(ConstService.baseAddress + 'api/posts/external', post, deferred);

            return deferred.promise;
        };

        this.getFeed = function (pageIndex, pageSize) {
            var deferred = $q.defer();

            HttpService.get(ConstService.baseAddress + 'api/posts?pageIndex=' + pageIndex + '&pageSize=' + pageSize, deferred);

            return deferred.promise;
        };

        this.getUsersFeed = function (userId, pageIndex, pageSize) {
            var deferred = $q.defer();

            HttpService.get(ConstService.baseAddress + 'api/posts?owner=' + userId + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize, deferred);

            return deferred.promise;
        };

        this.getPostsByTag = function (tag, pageIndex, pageSize) {
            var deferred = $q.defer();
            
            HttpService.get(ConstService.baseAddress + 'api/posts?tag=' + tag + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize, deferred);

            return deferred.promise;
        };

        this.getPostById = function (postId) {
            var deferred = $q.defer();

            HttpService.get(ConstService.baseAddress + 'api/posts?postId=' + postId, deferred);

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

        this.remove = function (postId) {
            var deferred = $q.defer();

            HttpService.delete(ConstService.baseAddress + 'api/posts?postId=' + postId, null, deferred);

            return deferred.promise;
        };
    }]);