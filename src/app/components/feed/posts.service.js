angular.module('photocloud').service('postsService', ['$q', 'httpService', 'constService',
    function ($q, httpService, constService) {
        this.createPost = function (post) {
            var deferred = $q.defer();

            httpService.post(constService.baseAddress + 'api/posts', post, deferred);

            return deferred.promise;
        };

        this.createPostFromExternal = function (post) {
            var deferred = $q.defer();

            httpService.post(constService.baseAddress + 'api/posts/external', post, deferred);

            return deferred.promise;
        };

        this.getFeed = function (pageIndex, pageSize) {
            var deferred = $q.defer();

            httpService.get(constService.baseAddress + 'api/posts?pageIndex=' + pageIndex + '&pageSize=' + pageSize, deferred);

            return deferred.promise;
        };

        this.getUsersFeed = function (userId, pageIndex, pageSize) {
            var deferred = $q.defer();

            httpService.get(constService.baseAddress + 'api/posts?owner=' + userId + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize, deferred);

            return deferred.promise;
        };

        this.getPostsByTag = function (tag, pageIndex, pageSize) {
            var deferred = $q.defer();
            
            httpService.get(constService.baseAddress + 'api/posts?tag=' + tag + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize, deferred);

            return deferred.promise;
        };

        this.getPostById = function (postId) {
            var deferred = $q.defer();

            httpService.get(constService.baseAddress + 'api/posts?postId=' + postId, deferred);

            return deferred.promise;
        };

        this.like = function (postId) {
            var deferred = $q.defer();

            httpService.post(constService.baseAddress + 'api/posts/like?postId=' + postId, null, deferred);

            return deferred.promise;
        };

        this.remove = function (postId) {
            var deferred = $q.defer();

            httpService.delete(constService.baseAddress + 'api/posts?postId=' + postId, null, deferred);

            return deferred.promise;
        };
    }]);