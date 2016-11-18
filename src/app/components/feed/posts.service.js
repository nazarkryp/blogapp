angular.module('blogapp').service('PostsService', ['$q', 'HttpService', 'ConstService',
    function ($q, HttpService, ConstService) {
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