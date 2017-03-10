(function () {
    angular.module('blogapp').controller('PostController', PostController);

    PostController.$inject = ['$scope', '$state', 'PostsService', 'AuthService'];

    function PostController($scope, $state, PostsService, AuthService) {
        var vm = this;
        vm.authService = AuthService;
        vm.isAuthenticated = AuthService.isAuthenticated;

        vm.like = function (post) {
            if (post.userHasLiked) {
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
                    vm.errorMessage = error;
                }
            );
        };

        vm.postComment = function (newComment, post, event) {
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
                            vm.errorMessage = error;
                        });

                    newComment.text = null;
                }
            }
        };

        vm.viewMoreCommentsClick = function (post) {
            PostsService.getComments(post.id).then(
                function (response) {
                    post.comments = response;
                },
                function (error) {
                    vm.errorMessage = error;
                }
            );
        };

        vm.newPostCaptionFocusLost = function () {
            vm.newPost.value = '';
        };

        vm.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        vm.copyLink = function (post) {
            $state.go('post', {
                postId: post.id
            });
        };

        $scope.$watch("authService.isAuthenticated",
            function (isAuthenticated) {
                vm.isAuthenticated = isAuthenticated;
            });
    };
})();