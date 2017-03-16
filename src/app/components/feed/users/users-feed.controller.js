angular.module('photocloud')
    .controller('UsersFeedController', ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'postsService', 'userService', 'authService', 'pageService',
        function ($scope, $state, $stateParams, $mdDialog, $window, $timeout, postsService, userService, authService, pageService) {
            $scope.feed = {
                pageIndex: 0,
                pageSize: 12,
                items: [],
                hasMoreItems: false
            };

            function getRelationshipsStatus(user) {
                userService.getRelationshipsWithUser(user.id).then(
                    function (response) {
                        pageService.isLoading = false;
                        $scope.user = user;
                        $scope.user.relationshipStatus = response.outgoingStatus;

                        getFeed();
                    }
                );
            }

            function getUser(username) {
                userService.getUserByName(username).then(
                    function (response) {
                        if (response.isActive && $scope.currentUser && $scope.currentUser.username != response.username) {
                            getRelationshipsStatus(response);
                        } else {
                            pageService.isLoading = false;
                            $scope.user = response;
                            getFeed();
                        }
                    }, function (errorResponse) {
                        if (errorResponse.status == 404) {
                            $scope.notFound = true;
                        } else {
                            $scope.errorMessage = errorResponse;
                        }

                        pageService.isLoading = false;
                    }
                );
            }

            function getFeed() {
                pageService.isLoading = true;

                postsService.getUsersFeed($stateParams.username, $scope.feed.pageIndex + 1, $scope.feed.pageSize).then(
                    function (response) {
                        if (response.items) {
                            $scope.feed.items = $scope.feed.items.concat(response.items);
                        }

                        $scope.feed.hasMoreItems = response.hasMoreItems;
                        $scope.feed.pageIndex = response.pageIndex;

                        pageService.isLoading = false;
                        $scope.isLoadingMorePosts = false;
                    },
                    function (errorResponse) {
                        pageService.isLoading = false;
                        $scope.isLoadingMorePosts = false;

                        $scope.errorMessage = errorResponse.error.message;
                    });
            }

            $scope.loadMorePosts = function () {
                $scope.isLoadingMorePosts = true;
                getFeed();
            };

            $scope.showDetails = function (post) {
                post.showDetails = true;
            };

            $scope.hideDetails = function (post) {
                post.showDetails = false;
            };

            $scope.showPostDetailsDialog = function (ev, post) {
                $mdDialog.show({
                    controller: 'PostDetailsDialogController',
                    templateUrl: 'app/components/post-details/dialogs/post-details-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        post: post
                    }
                });
            };

            var init = function () {
                pageService.isLoading = true;
                pageService.title = 'Photocloud - ' + $stateParams.username;

                getUser($stateParams.username);
            };

            init();
        }]);