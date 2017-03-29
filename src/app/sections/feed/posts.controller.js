(function() {
    'use strict';

    angular.module('photocloud')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'postsService', 'authService', 'pageService'];

    function FeedController($scope, $state, $stateParams, $mdDialog, $window, $timeout, postsService, authService, pageService) {
        var vm = this;

        vm.authService = authService;
        vm.isAuthenticated = false;
        vm.isLoadingMorePosts = false;
        vm.infoMessage = '';
        vm.newPost = {};

        vm.windowCenter = window.innerHeight / 2 - window.innerHeight * 0.25;

        vm.feed = {
            pageIndex: 0,
            pageSize: 12,
            items: [],
            hasMoreItems: false
        };

        vm.loadMorePosts = function() {
            vm.isLoadingMorePosts = true;
            getFeed($stateParams.username);
        };

        $scope.$watch("vm.authService.isAuthenticated",
            function(value) {
                vm.isAuthenticated = value;
            });

        vm.removePost = function(index) {
            var post = vm.feed.items[index];

            if (post.id) {
                postsService.remove(post.id).then(
                    function(response) {
                        vm.feed.items.splice(index, 1);
                    },
                    function(error) {
                        console.log(error);
                    });
            }
        };

        vm.showCreatePostDialog = function(ev) {
            $mdDialog.show({
                controller: 'CreatePostController',
                controllerAs: 'vm',
                templateUrl: 'app/components/upload/create-post.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: '-sm'
            }).then(
                function(post) {
                    post.isCreating = true;
                    addNewPost(post);
                    createPost(post);
                },
                function() {});
        };

        function createPost(post) {
            postsService.createPost(post)
                .then(function(response) {
                    mapPost(post, response);
                    post.isCreating = false;

                    if (vm.feed.items.length === 0) {
                        vm.infoMessage = 'Nobody has posted anything yet';
                    } else {
                        vm.infoMessage = '';
                    }
                }, function(error) {
                    console.log(error);
                });
        };

        function addNewPost(post) {
            if (!$stateParams.username || $stateParams.username === authService.username) {
                vm.feed.items.unshift(post);
            }

            if (vm.feed.items.length === 0) {
                vm.infoMessage = 'Nobody has posted anything yet';
            } else {
                vm.infoMessage = '';
            }
        };

        function mapPost(post, response) {
            post.id = response.id;
            post.attachments = [];
            response.attachments.forEach(function(attachment) {
                post.attachments.push(attachment);
            }, this);
            post.created = response.created;
            post.caption = response.caption;
            post.user = response.user;
            post.commentsCount = response.commentsCount;
            post.comments = response.comments;
            post.likesCount = response.likesCount;
            post.likes = response.likesCount;
        };

        function showLoadingDialog() {
            $mdDialog.show({
                contentElement: '#loadingDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        };

        function getFeedPromise() {
            if (!$stateParams.username) {
                pageService.title = 'Photocloud';

                return postsService.getFeed(vm.feed.pageIndex + 1, vm.feed.pageSize);
            } else {
                pageService.title = 'Photocloud - ' + $stateParams.username;

                return postsService.getUsersFeed($stateParams.username, vm.feed.pageIndex + 1, vm.feed.pageSize);
            }
        };

        function getFeed() {
            vm.infoMessage = '';

            getFeedPromise().then(
                function(response) {
                    if (response.items) {
                        vm.feed.items = vm.feed.items.concat(response.items);
                    }

                    vm.feed.hasMoreItems = response.hasMoreItems;
                    vm.feed.pageIndex = response.pageIndex;

                    pageService.isLoading = false;
                    vm.isLoadingMorePosts = false;

                    generateInfoMessage();
                },
                function(error) {
                    pageService.isLoading = false;
                    vm.isLoadingMorePosts = false;
                });
        };

        function generateInfoMessage() {
            if (vm.feed.items.length === 0) {
                vm.infoMessage = 'Nobody has posted anything yet';
            } else {
                vm.infoMessage = '';
            }
        };

        vm.$onInit = function() {
            pageService.isLoading = true;

            if ($stateParams.username) {
                vm.username = $stateParams.username;
            }

            getFeed();
        };
    }
})();