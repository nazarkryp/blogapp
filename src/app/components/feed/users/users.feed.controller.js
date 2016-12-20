angular.module('blogapp')
    .controller('UsersFeedController', ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'PostsService', 'UserService', 'AuthService', 'PageService',
        function ($scope, $state, $stateParams, $mdDialog, $window, $timeout, PostsService, UserService, AuthService, PageService) {
            $scope.feed = {
                pageIndex: 0,
                pageSize: 12,
                posts: [],
                hasMoreItems: false
            };

            function getRelationshipsStatus(user) {
                UserService.getRelationshipsWithUser(user.id).then(
                    function (response) {
                        PageService.isLoading = false;
                        $scope.user = user;
                        $scope.user.relationshipStatus = response.outgoingStatus;

                        getFeed();
                    }
                );
            }

            function getUser(username) {
                UserService.getUserByName(username).then(
                    function (response) {
                        if ($scope.currentUser.username && response.username && $scope.currentUser.username != response.username) {
                            getRelationshipsStatus(response);
                        } else {
                            PageService.isLoading = false;
                            $scope.user = response;
                            getFeed();
                        }
                    }, function (errorResponse) {
                        if (errorResponse.status == 404) {
                            $scope.notFound = true;
                        } else {
                            $scope.errorMessage = errorResponse;
                        }

                        PageService.isLoading = false;
                    }
                );
            }

            function getFeed() {
                PageService.isLoading = true;

                PostsService.getUsersFeed($stateParams.username, $scope.feed.pageIndex + 1, $scope.feed.pageSize).then(
                    function (response) {
                        if (response.posts) {
                            $scope.feed.posts = $scope.feed.posts.concat(response.posts);
                        }

                        $scope.feed.hasMoreItems = response.hasMoreItems;
                        $scope.feed.pageIndex = response.pageIndex;

                        PageService.isLoading = false;
                        $scope.isLoadingMorePosts = false;
                    },
                    function (errorResponse) {
                        PageService.isLoading = false;
                        $scope.isLoadingMorePosts = false;

                        $scope.errorMessage = errorResponse.error.message;
                    });
            }

            $scope.loadMorePosts = function () {
                $scope.isLoadingMorePosts = true;
                getFeed();
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
                PageService.isLoading = true;
                PageService.title = 'Photocloud - ' + $stateParams.username;

                getUser($stateParams.username);
            };

            init();
        }]);