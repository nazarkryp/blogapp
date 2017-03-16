angular.module('photocloud')
    .controller('FeedController', ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'postsService', 'authService', 'pageService',
        function ($scope, $state, $stateParams, $mdDialog, $window, $timeout, postsService, authService, pageService) {
            $scope.authService = authService;
            $scope.isAuthenticated = false;
            $scope.isLoadingMorePosts = false;
            $scope.infoMessage = '';
            $scope.newPost = {};

            $scope.windowCenter = window.innerHeight / 2 - window.innerHeight * 0.25;

            $scope.feed = {
                pageIndex: 0,
                pageSize: 12,
                items: [],
                hasMoreItems: false
            };

            $scope.loadMorePosts = function () {
                $scope.isLoadingMorePosts = true;
                getFeed($stateParams.username);
            };

            $scope.$watch("authService.isAuthenticated",
                function (value) {
                    $scope.isAuthenticated = value;
                });

            $scope.removePost = function (index) {
                var post = $scope.feed.items[index];

                if (post.id) {
                    postsService.remove(post.id).then(
                        function (response) {
                            $scope.feed.items.splice(index, 1);
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

            var createPost = function (post) {
                var promise = null;

                if (!post.isExternal) {
                    promise = postsService.createPost(post);
                } else {
                    promise = postsService.createPostFromExternal(post);
                }

                promise.then(function (response) {
                    mapPost(post, response);
                    post.isCreating = false;

                    if ($scope.feed.items.length === 0) {
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
                    $scope.feed.items.unshift(post);
                } else if ($stateParams.username === authService.username) {
                    $scope.feed.items.unshift(post);
                }

                if ($scope.feed.items.length === 0) {
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
                    pageService.title = 'Photocloud';

                    return postsService.getFeed($scope.feed.pageIndex + 1, $scope.feed.pageSize);
                } else {
                    pageService.title = 'Photocloud - ' + $stateParams.username;

                    return postsService.getUsersFeed($stateParams.username, $scope.feed.pageIndex + 1, $scope.feed.pageSize);
                }
            };

            var getFeed = function () {
                $scope.infoMessage = '';

                getFeedPromise().then(
                    function (response) {
                        if (response.items) {
                            $scope.feed.items = $scope.feed.items.concat(response.items);
                        }

                        $scope.feed.hasMoreItems = response.hasMoreItems;
                        $scope.feed.pageIndex = response.pageIndex;

                        pageService.isLoading = false;
                        $scope.isLoadingMorePosts = false;

                        generateInfoMessage();
                    },
                    function (errorResponse) {
                        pageService.isLoading = false;
                        $scope.isLoadingMorePosts = false;

                        $scope.errorMessage = errorResponse.error.message;
                    });
            };

            function generateInfoMessage() {
                if ($scope.feed.items.length === 0) {
                    $scope.infoMessage = 'Nobody has posted anything yet';
                } else {
                    $scope.infoMessage = '';
                }
            };

            var onInit = function () {
                pageService.isLoading = true;

                if ($stateParams.username) {
                    $scope.username = $stateParams.username;
                }

                getFeed();
            };

            onInit();
        }]);