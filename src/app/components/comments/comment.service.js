(function() {
    'use strict';

    angular.module('photocloud')
        .service('commentService', commentService);

    commentService.$inject = ['$q', 'httpService', 'constService'];

    function commentService($q, httpService, constService) {
        this.getComments = function(postId) {
            var deferred = $q.defer();

            httpService.get(constService.baseAddress + 'api/comments?postId=' + postId, deferred);

            return deferred.promise;
        }

        this.createComment = function(text, postId) {
            var deferred = $q.defer();

            httpService.post(constService.baseAddress + 'api/comments?postId=' + postId, text, deferred);

            return deferred.promise;
        }

        this.removeComment = function() {

        }

        this.editComment = function() {

        }
    }
})();