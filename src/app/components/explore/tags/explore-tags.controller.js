angular.module('blogapp').controller('ExploreTagsController', ['$state', '$stateParams', 'postsService', 'AuthService', 'PageService',
    function ($state, $stateParams, postsService, AuthService, PageService) {
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

            postsService.getPostsByTag(self.tag, self.feed.pageIndex + 1, self.feed.pageSize).then(
            //postsService.getUsersFeed('lanafeshchuk', self.feed.pageIndex + 1, self.feed.pageSize).then(
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
