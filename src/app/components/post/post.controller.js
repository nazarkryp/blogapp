angular.module('blogapp')
    .controller('PostController', ['$scope', '$state', 'PostsService', 'AuthService',
        function ($scope, $state, PostsService, AuthService) {
            $scope.authService = AuthService;
            $scope.isAuthenticated = AuthService.isAuthenticated;

            $scope.$watch("authService.isAuthenticated",
                function (isAuthenticated) {
                    $scope.isAuthenticated = isAuthenticated;
                });

            $scope.like = function (post) {
                if (post.UserHasLiked) {
                    post.likesCount--;
                } else {
                    post.likesCount++;
                }

                post.userHasLiked = !post.userHasLiked;

                PostsService.like(post.id).then(
                    function (response) {
                        post.likesCount = response.likesCount;
                        post.userHasLiked = response.userHasLiked;
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
                            text: newComment.text,
                        };

                        PostsService.postComment(comment, post.id).then(
                            function (response) {
                                if (!post.comments) {
                                    post.comments = [];
                                }
                                
                                post.comments.push(response);
                            },
                            function (error) {
                                $scope.errorMessage = error;
                            });

                        newComment.text = null;
                    }
                }
            };

            $scope.viewMoreCommentsClick = function (post) {
                PostsService.getComments(post.id).then(
                    function (response) {
                        post.comments = response;
                    },
                    function (error) {
                        $scope.errorMessage = error;
                    }
                );
            };

            $scope.newPostCaptionFocusLost = function () {
                $scope.newPost.value = '';
            };

            $scope.openMenu = function ($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };

            $scope.copyLink = function (post) {
                $state.go('post', {
                    postId: post.id
                });
            };

            var init = function () {
                $scope.post = $scope.$ctrl.post;
            };

            init();
        }]);