angular.module('blogapp')
    .controller('FeedController', ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'PostsService', 'AuthService',
        function ($scope, $state, $stateParams, $mdDialog, $window, $timeout, PostsService, AuthService) {
            $scope.authService = AuthService;
            $scope.isAuthenticated = false;
            $scope.isLoading = false;
            $scope.isLoadingMorePosts = false;
            $scope.newPost = {
            };

            $scope.feed = {
                PageIndex: 0,
                PageSize: 5,
                Posts: [],
                HasMoreItems: false
            };

            var getFeedPromise = function () {
                if (!$stateParams.username) {
                    return PostsService.getFeed($scope.feed.PageIndex + 1, $scope.feed.PageSize);
                } else {
                    return PostsService.getUsersFeed($stateParams.username, $scope.feed.PageIndex + 1, $scope.feed.PageSize);
                }
            };

            var getFeed = function () {
                getFeedPromise($stateParams.username).then(
                    function (response) {
                        if (response.Posts) {
                            response.Posts.forEach(function (post) {
                                $scope.feed.Posts.push(post);
                            }, this);
                        }

                        $scope.feed.HasMoreItems = response.HasMoreItems;
                        $scope.feed.PageIndex = response.PageIndex;

                        $scope.isLoading = false;
                        $scope.isLoadingMorePosts = false;
                    },
                    function (error) {
                        $scope.isLoading = false;
                        $scope.isLoadingMorePosts = false;
                    });
            };

            $scope.showDetails = function (post) {
                post.showDetails = true;
            };

            $scope.hideDetails = function (post) {
                post.showDetails = false;
            };

            $scope.loadMorePosts = function () {
                $scope.isLoadingMorePosts = true;
                getFeed($stateParams.username);
            };

            $scope.$watch("authService.authenticated",
                function (value) {
                    $scope.isAuthenticated = value;
                });

            $scope.newPostCaptionFocusLost = function () {
                $scope.newPost.value = '';
            };

            $scope.openMenu = function ($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            $scope.viewMoreCommentsClick = function (post) {
                PostsService.getComments(post.Id).then(
                    function (response) {
                        post.Comments = response;
                    },
                    function (error) {
                        $scope.errorMessage = error;
                    }
                );
            };

            $scope.postComment = function (newComment, post, event) {
                if (event.key === 'Enter') {
                    if (newComment) {
                        var comment = {
                            Text: newComment.Text,
                        };

                        PostsService.postComment(comment, post.Id).then(
                            function (response) {
                                if (!post.Comments) {
                                    post.Comments = [];
                                }

                                post.Comments.push(response);
                            },
                            function (error) {
                                $scope.errorMessage = error;
                            });

                        newComment.Text = null;
                    }
                }
            };

            $scope.like = function (post) {
                PostsService.like(post.Id).then(
                    function (response) {
                        post.LikesCount = response.LikesCount;
                        post.UserHasLiked = response.UserHasLiked;
                    },
                    function (error) {
                        $scope.errorMessage = error;
                    }
                );
            };

            $scope.removePost = function (index) {
                var post = $scope.feed.Posts[index];

                if (post.Id) {
                    PostsService.remove(post.Id).then(
                        function (response) {
                            $scope.feed.Posts.splice(index, 1);
                        },
                        function (error) {
                            console.log(error);
                        });
                }
            };

            $scope.showCreatePostDialog = function (ev) {
                $mdDialog.show({
                    controller: 'CreatePostController',
                    templateUrl: 'app/components/upload/create-post.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: '-sm'
                }).then(
                    function (post) {
                        if (post) {
                            if (!$stateParams.username) {
                                $scope.feed.Posts.unshift(post);
                            }
                            if ($stateParams.username === AuthService.Username) {
                                $scope.feed.Posts.unshift(post);
                            }
                        } else {
                            console.log('fuck');
                        }
                    },
                    function () {
                    });
            };

            var init = function () {
                $scope.isLoading = true;
                getFeed();

                if ($stateParams.username) {
                    $scope.username = $stateParams.username;
                }
            };

            init();
        }]);