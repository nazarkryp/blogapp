angular.module('blogapp')
    .controller('PostDetailsDialogController', ['$scope', 'postsService', 'AuthService', 'post',
        function ($scope, postsService, AuthService, post) {
            $scope.post = post;
            $scope.isAuthenticated = AuthService.isAuthenticated;
            $scope.currentuserId = AuthService.userId;

            $scope.maxHeight = window.innerHeight - 200;
            $scope.maxWidth = window.innerWidth - 350 - 300;

            $scope.viewMoreCommentsClick = function (post) {
                postsService.getComments(post.id).then(
                    function (response) {
                        post.comments = response;
                    }, function (error) {
                        console.log(error);
                    }
                );
            };

            $scope.like = function (post) {
                if (post.userHasLiked) {
                    post.likesCount--;
                } else {
                    post.likesCount++;
                }

                post.userHasLiked = !post.userHasLiked;

                postsService.like(post.id).then(
                    function (response) {
                        post.likesCount = response.likesCount;
                        post.userHasLiked = response.userHasLiked;
                    },
                    function (error) {
                        $scope.errorMessage = error;
                    }
                );
            };

            $scope.createComment = function (newComment, post, ev) {
                if (ev.key === 'Enter') {
                    if (newComment) {
                        var comment = {
                            from: {
                                username: AuthService.username
                            },
                            text: newComment.text,
                        };

                        if (!post.comments) {
                            post.comments = [];
                        }

                        post.comments.push(comment);
                        post.commentsCount++;

                        postsService.postComment(comment, post.id).then(
                            function (response) {
                                mapComment(comment, response);
                            },
                            function (error) {
                                $scope.errorMessage = error;
                                post.commentsCount--;
                            });

                        newComment.text = null;
                    }
                }
            };

            function mapComment(comment, response) {
                comment.id = response.id;
                comment.from = response.from;
                comment.text = response.text;
            }
        }]);