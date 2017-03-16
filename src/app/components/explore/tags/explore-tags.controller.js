(function() {
    'use strict';

    angular.module('photocloud')
        .controller('ExploreTagsController', ExploreTagsController);

    ExploreTagsController.$inject = ['$state', '$stateParams', 'postsService', 'authService', 'pageService'];

    function ExploreTagsController($state, $stateParams, postsService, authService, pageService) {
        var vm = this;
        vm.currentUserId = authService.userId;
        vm.feed = {
            items: [],
            hasMoreItems: false,
            pageIndex: 0,
            pageSize: 12,
            totalCount: 0
        };

        vm.getPosts = function() {
            pageService.isLoading = true;

            postsService.getPostsByTag(vm.tag, vm.feed.pageIndex + 1, vm.feed.pageSize)
                .then(
                    function(response) {
                        pageService.isLoading = false;
                        vm.feed = response;
                    },
                    function(error) {
                        pageService.isLoading = false;
                    });
        };

        var init = function() {
            pageService.title = $stateParams.tag + ' • ' + ' Photocloud';
            vm.tag = $stateParams.tag;

            vm.getPosts();
        };

        init();
    }
})();