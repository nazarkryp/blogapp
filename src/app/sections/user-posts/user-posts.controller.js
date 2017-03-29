(function() {
    'use strict';

    angular.module('photocloud')
        .controller('UserFeedController', UserFeedController);

    UserFeedController.$inject = ['$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'postsService', 'userService', 'authService', 'pageService'];

    function UserFeedController($state, $stateParams, $mdDialog, $window, $timeout, postsService, userService, authService, pageService) {
        var vm = this;

        vm.currentUser = {
            userId: authService.userId,
            username: authService.username,
            imageUri: authService.imageUri,
            isPrivate: authService.isPrivate,
            isActive: authService.isActive,
            isAuthenticated: authService.isAuthenticated
        };

        vm.feed = {
            pageIndex: 0,
            pageSize: 12,
            items: [],
            hasMoreItems: false
        };

        function getRelationshipsStatus(user) {
            userService.getRelationshipsWithUser(user.id).then(
                function(response) {
                    pageService.isLoading = false;
                    vm.user = user;
                    vm.user.relationshipStatus = response.outgoingStatus;

                    getFeed();
                }
            );
        }

        function getUser(username) {
            userService.getUserByName(username).then(
                function(response) {
                    if (response.isActive && vm.currentUser && vm.currentUser.isAuthenticated && vm.currentUser.username != response.username) {
                        console.log(vm.currentUser);
                        getRelationshipsStatus(response);
                    } else {
                        pageService.isLoading = false;
                        vm.user = response;
                        getFeed();
                    }
                },
                function(errorResponse) {
                    if (errorResponse.status == 404) {
                        vm.notFound = true;
                    } else {
                        vm.errorMessage = errorResponse;
                    }

                    pageService.isLoading = false;
                }
            );
        }

        function getFeed() {
            if (!vm.currentUser.isAuthenticated && vm.user.isPrivate) {
                vm.errorMessage = 'This account is private';

                return;
            }

            pageService.isLoading = true;

            postsService.getUsersFeed($stateParams.username, vm.feed.pageIndex + 1, vm.feed.pageSize).then(
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
                function(errorResponse) {
                    pageService.isLoading = false;
                    vm.isLoadingMorePosts = false;

                    vm.errorMessage = errorResponse.error.message;
                });
        }

        vm.loadMorePosts = function() {
            vm.isLoadingMorePosts = true;
            getFeed();
        };

        vm.showDetails = function(post) {
            post.showDetails = true;
        };

        vm.hideDetails = function(post) {
            post.showDetails = false;
        };

        function generateInfoMessage() {
            if (vm.feed.items.length === 0) {
                vm.infoMessage = vm.user.username + ' hasn\'t posted anything yet';
            } else {
                vm.infoMessage = '';
            }
        };

        vm.showPostDetailsDialog = function(ev, post) {
            $mdDialog.show({
                controller: 'PostDetailsDialogController',
                templateUrl: 'app/components/posts/post-details/dialogs/post-details-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    post: post
                }
            });
        };

        vm.$onInit = function() {
            pageService.isLoading = true;
            pageService.title = 'Photocloud - ' + $stateParams.username;

            getUser($stateParams.username);
        };
    }
})();