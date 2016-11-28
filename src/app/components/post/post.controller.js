angular.module('blogapp')
    .controller('PostController', ['$scope', 'PostsService', 'AuthService', 'DateCalculatorService',
        function($scope, PostsService, AuthService, DateCalculatorService) {
            $scope.authService = AuthService;
            $scope.isAuthenticated = AuthService.authenticated;

            $scope.$watch("authService.authenticated",
                function(value) {
                    $scope.isAuthenticated = value;
                });

            $scope.like = function(post) {
                if (post.UserHasLiked) {
                    post.LikesCount--;
                } else {
                    post.LikesCount++;
                }

                post.UserHasLiked = !post.UserHasLiked;

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

            $scope.newPostCaptionFocusLost = function() {
                $scope.newPost.value = '';
            };

            $scope.openMenu = function($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };

            $scope.difference = function(postDate) {
                return DateCalculatorService.getDifference(postDate);
            };

            var init = function() {
                $scope.post = $scope.$ctrl.post;
            };

            init();
        }]);