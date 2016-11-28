angular.module('blogapp')
    .controller('FeedController', ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'PostsService', 'AuthService', 'DateCalculatorService',
        function($scope, $state, $stateParams, $mdDialog, $window, $timeout, PostsService, AuthService, DateCalculatorService) {
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

            var getFeedPromise = function() {
                if (!$stateParams.username) {
                    return PostsService.getFeed($scope.feed.PageIndex + 1, $scope.feed.PageSize);
                } else {
                    return PostsService.getUsersFeed($stateParams.username, $scope.feed.PageIndex + 1, $scope.feed.PageSize);
                }
            };

            var getFeed = function() {
                getFeedPromise($stateParams.username).then(
                    function(response) {
                        if (response.Posts) {
                            response.Posts.forEach(function(post) {
                                post.isCreating = false;
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

            $scope.showDetails = function(post) {
                post.showDetails = true;
            };

            $scope.hideDetails = function(post) {
                post.showDetails = false;
            };

            $scope.loadMorePosts = function() {
                $scope.isLoadingMorePosts = true;
                getFeed($stateParams.username);
            };

            $scope.$watch("authService.authenticated",
                function(value) {
                    $scope.isAuthenticated = value;
                });

            $scope.removePost = function(index) {
                var post = $scope.feed.Posts[index];

                if (post.Id) {
                    PostsService.remove(post.Id).then(
                        function(response) {
                            $scope.feed.Posts.splice(index, 1);
                        },
                        function(error) {
                            console.log(error);
                        });
                }
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
                            post.isCreating = true;
                            addNewPost(post);
                            createPost(post);
                        } else {
                            console.log('fuck');
                        }
                    },
                    function() {
                    });
            };

            var createPost = function(post) {
                var promise = null;

                if (!post.isExternal) {
                    promise = PostsService.createPost(post);
                } else {
                    promise = PostsService.createPostFromExternal(post);
                }

                promise.then(function(response) {
                    mapPost(post, response);
                }, function(error) {
                    console.log(error);
                });
            };

            var addNewPost = function(post) {
                post.Id = 100500;
                post.Attachment.Id = 100;
                console.log(post);
                $scope.feed.Posts.unshift(post);
                // if (!$stateParams.username) {
                //     $scope.feed.Posts.unshift(post);
                // }
                // if ($stateParams.username === AuthService.Username) {
                //     $scope.feed.Posts.unshift(post);
                // }
            };

            var mapPost = function(post, response) {
                post.Id = response.Id;
                post.Attachment.Id = response.Attachment.Id;
                post.Caption = response.Caption;
                post.User = response.User;
                post.CommentsCount = response.CommentsCount;
                post.Comments = response.Comments;
                post.LikesCount = response.LikesCount;
                post.Likes = response.LikesCount;
            };

            $scope.difference = function(postDate) {
                return DateCalculatorService.getDifference(postDate);
            };

            $scope.showPostDetailsDialog = function(ev, post) {
                $mdDialog.show({
                    controller: 'PostDetailsController',
                    templateUrl: 'app/components/post-details/post-details.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: '-sm',
                    locals: {
                        post: post
                    }
                });
            };

            var showLoadingDialog = function() {
                $mdDialog.show({
                    contentElement: '#loadingDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                });
            };

            var init = function() {
                $scope.isLoading = true;
                getFeed();

                if ($stateParams.username) {
                    $scope.username = $stateParams.username;
                }
            };

            init();
        }]);