angular.module('blogapp').controller('ExploreTagsController', ['$state', '$stateParams', 'PostsService', 'AuthService', 'PageService',
    function ($state, $stateParams, PostsService, AuthService, PageService) {
        var self = this;
        self.currentUserId = AuthService.userId;
        self.feed = {
            items: [],
            hasMoreItems: false,
            pageIndex: 0,
            pageSize: 12,
            totalCount : 0
        };

        self.loadMore = function () {
            getPosts();
        };

        function getPosts() {
            PageService.isLoading = true;

            PostsService.getPostsByTag(self.tag, self.feed.pageIndex + 1, self.feed.pageSize).then(
            //PostsService.getUsersFeed('lanafeshchuk', self.feed.pageIndex + 1, self.feed.pageSize).then(
                function (response) {
                    PageService.isLoading = false;

                    self.feed = response;
                }, function (error) {
                    PageService.isLoading = false;
                });
        };

        var init = function () {
            PageService.title = $stateParams.tag + ' • ' + ' Photocloud';
            self.tag = $stateParams.tag;

            getPosts();
        };

        init();
    }]);
