angular.module('blogapp')
    .controller('FeedController', ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'PostsService', 'RelationshipsService', 'AuthService',
        function($scope, $state, $stateParams, $mdDialog, $window, $timeout, PostsService, RelationshipsService, AuthService) {
            $scope.authService = AuthService;
            $scope.isAuthenticated = false;
            $scope.isLoading = false;
            $scope.isLoadingMorePosts = false;
            $scope.posts = [];
            $scope.newPost = {
            };

            $scope.feed = {
                PageIndex: 0,
                PageSize: 3,
                Posts: [],
                HasMoreItems: false
            };

            var getUser = function(userId) {
                RelationshipsService.getRelationships(userId).then(
                    function(response) {
                        $scope.user = response.User;
                        $scope.isUserFollowed = response.IsFollowed;
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            };

            var getFeedPromise = function() {
                if (!$stateParams.id) {
                    return PostsService.getFeed($scope.feed.PageIndex + 1, $scope.feed.PageSize);
                } else {
                    return PostsService.getUsersFeed($stateParams.id, $scope.feed.PageIndex + 1, $scope.feed.PageSize);
                }
            };

            var getFeed = function() {
                getFeedPromise($stateParams.id).then(
                    function(response) {
                        if (response.Posts) {
                            response.Posts.forEach(function(post) {
                                $scope.feed.Posts.push(post);
                            }, this);
                        }

                        $scope.feed.HasMoreItems = response.HasMoreItems;
                        $scope.feed.PageIndex = response.PageIndex;

                        $scope.isLoading = false;
                        $scope.isLoadingMorePosts = false;
                    },
                    function(error) {
                        $scope.isLoading = false;
                        $scope.isLoadingMorePosts = false;
                    });
            };

            $scope.loadMorePosts = function() {
                $scope.isLoadingMorePosts = true;
                getFeed($stateParams.id);
            };

            $scope.$watch("authService.Authenticated",
                function(value) {
                    $scope.isAuthenticated = value;
                });

            $scope.newPostCaptionFocusLost = function() {
                $scope.newPost.value = '';
            };

            $scope.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            $scope.viewMoreCommentsClick = function(post) {
                PostsService.getComments(post.Id).then(
                    function(response) {
                        post.Comments = response;
                    },
                    function(error) {
                        $scope.errorMessage = error;
                    }
                );
            };

            $scope.postComment = function(newComment, post, event) {
                if (event.key === 'Enter') {
                    if (newComment) {
                        var comment = {
                            Text: newComment.Text,
                        };

                        PostsService.postComment(comment, post.Id).then(
                            function(response) {
                                if (!post.Comments) {
                                    post.Comments = [];
                                }

                                post.Comments.push(response);
                            },
                            function(error) {
                                $scope.errorMessage = error;
                            });

                        newComment.Text = null;
                    }
                }
            };

            $scope.like = function(post) {
                PostsService.like(post.Id).then(
                    function(response) {
                        post.LikesCount = response.LikesCount;
                        post.UserHasLiked = response.UserHasLiked;
                    },
                    function(error) {
                        $scope.errorMessage = error;
                    }
                );
            };

            $scope.showCreatePostDialog = function(ev) {
                $mdDialog.show({
                    controller: 'CreatePostController',
                    templateUrl: 'app/components/upload/create-post.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: '-sm'
                }).then(
                    function(post) {
                        if (post) {
                            if (!$stateParams.id) {
                                $scope.feed.Posts.unshift(post);
                            }
                            if ($stateParams.id === AuthService.UserId) {
                                $scope.feed.Posts.unshift(post);
                            }
                        } else {
                            console.log('fuck');
                        }
                    },
                    function() {
                    });
            };

            var init = function() {
                $scope.isLoading = true;
                getFeed();

                if ($stateParams.id) {
                    getUser($stateParams.id);
                }
            };

            init();
        }]);