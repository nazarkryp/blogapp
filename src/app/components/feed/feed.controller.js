angular.module('blogapp')
    .controller('FeedController', ['$scope', '$state', '$stateParams', '$mdDialog', '$window', '$timeout', 'PostsService', 'AuthService',
        function ($scope, $state, $stateParams, $mdDialog, $window, $timeout, PostsService, AuthService) {
            $scope.authService = AuthService;
            $scope.isAuthenticated = false;
            $scope.isLoading = false;
            $scope.posts = [];
            $scope.newPost = {
            };

            $scope.$watch("authService.Authenticated",
                function (value) {
                    $scope.isAuthenticated = value;
                });

            var init = function () {
                $scope.getFeed($stateParams.id);
            };

            $scope.newPostCaptionFocusLost = function () {
                $scope.newPost.value = '';
            };

            $scope.openMenu = function ($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            $scope.getFeed = function (userId) {
                $scope.isLoading = true;

                PostsService.getPosts(userId)
                    .then(function (response) {
                        $scope.posts = response;
                        $scope.isLoading = false;
                    },
                    function (error) {
                        if (error.status === 404) {
                            $scope.errorMessage = "User not found";
                        }

                        $scope.isLoading = false;
                    });
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
                            $scope.posts.unshift(post);
                        } else {
                            console.log('fuck');
                        }
                    },
                    function () {
                    });
            };

            init();
        }]);