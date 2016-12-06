angular.module('blogapp')
    .controller('FeedController', ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'PostsService', 'AuthService', 'PageService',
        function ($scope, $state, $stateParams, $mdDialog, $window, $timeout, PostsService, AuthService, PageService) {
            $scope.authService = AuthService;
            $scope.isAuthenticated = false;
            $scope.isLoading = false;
            $scope.isLoadingMorePosts = false;
            $scope.infoMessage = '';
            $scope.newPost = {};

            $scope.windowCenter = window.innerHeight / 2 - window.innerHeight * 0.25;

            $scope.feed = {
                pageIndex: 0,
                pageSize: 6,
                posts: [],
                hasMoreItems: false
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

            $scope.removePost = function (index) {
                var post = $scope.feed.posts[index];

                if (post.id) {
                    PostsService.remove(post.id).then(
                        function (response) {
                            $scope.feed.posts.splice(index, 1);
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
                        post.isCreating = true;
                        addNewPost(post);
                        createPost(post);
                    },
                    function () {
                    });
            };

            $scope.showPostDetailsDialog = function (ev, post) {
                $mdDialog.show({
                    controller: 'PostDetailsDialogController',
                    templateUrl: 'app/components/post-details/dialogs/post-details-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: '-sm',
                    locals: {
                        post: post
                    }
                });
            };

            var createPost = function (post) {
                var promise = null;

                if (!post.isExternal) {
                    promise = PostsService.createPost(post);
                } else {
                    promise = PostsService.createPostFromExternal(post);
                }

                promise.then(function (response) {
                    mapPost(post, response);
                    post.isCreating = false;

                    if ($scope.feed.posts.length === 0) {
                        $scope.infoMessage = 'Nobody has posted anything yet';
                    } else {
                        $scope.infoMessage = '';
                    }
                }, function (error) {
                    console.log(error);
                });
            };

            var addNewPost = function (post) {
                if (!$stateParams.username) {
                    $scope.feed.posts.unshift(post);
                } else if ($stateParams.username === AuthService.username) {
                    $scope.feed.posts.unshift(post);
                }

                if ($scope.feed.posts.length === 0) {
                    $scope.infoMessage = 'Nobody has posted anything yet';
                } else {
                    $scope.infoMessage = '';
                }
            };

            var mapPost = function (post, response) {
                post.id = response.id;
                post.attachment.id = response.attachment.id;
                post.created = response.created;
                post.caption = response.caption;
                post.user = response.user;
                post.commentsCount = response.commentsCount;
                post.comments = response.comments;
                post.likesCount = response.likesCount;
                post.likes = response.likesCount;
            };

            var showLoadingDialog = function () {
                $mdDialog.show({
                    contentElement: '#loadingDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                });
            };

            var getFeedPromise = function () {
                if (!$stateParams.username) {
                    PageService.title = 'Kryptogram';
                    return PostsService.getFeed($scope.feed.pageIndex + 1, $scope.feed.pageSize);
                } else {
                    PageService.title = $stateParams.username;
                    return PostsService.getUsersFeed($stateParams.username, $scope.feed.pageIndex + 1, $scope.feed.pageSize);
                }
            };

            var getFeed = function () {
                $scope.infoMessage = '';

                getFeedPromise().then(
                    function (response) {
                        if (response.posts) {
                            //$scope.feed.posts.concat(response.posts);
                            //Array.prototype.push.apply($scope.feed.posts, response.posts);
                            $scope.feed.posts = $scope.feed.posts.concat(response.posts);
                            // response.posts.forEach(function(post) {
                            //     post.isCreating = false;
                            //     $scope.feed.posts.push(post);
                            // }, this);
                        }

                        $scope.feed.hasMoreItems = response.hasMoreItems;
                        $scope.feed.pageIndex = response.pageIndex;

                        $scope.isLoading = false;
                        $scope.isLoadingMorePosts = false;

                        if ($scope.feed.posts.length === 0) {
                            $scope.infoMessage = 'Nobody has posted anything yet';
                        } else {
                            $scope.infoMessage = '';
                        }
                    },
                    function (error) {
                        $scope.isLoading = false;
                        $scope.isLoadingMorePosts = false;

                        $scope.infoMessage = error;
                    });
            };

            var init = function () {
                $scope.isLoading = true;

                if ($stateParams.username) {
                    $scope.username = $stateParams.username;
                }

                getFeed();
            };

            init();
        }]);