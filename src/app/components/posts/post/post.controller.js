(function() {
    angular.module('photocloud').controller('PostController', PostController);

    PostController.$inject = ['$scope', '$state', '$mdDialog', 'postsService', 'commentService', 'authService'];

    function PostController($scope, $state, $mdDialog, postsService, commentService, authService) {
        var vm = this;

        vm.authService = authService;
        vm.isAuthenticated = authService.isAuthenticated;

        vm.like = function(post) {
            if (post.userHasLiked) {
                post.likesCount--;
            } else {
                post.likesCount++;
            }

            post.userHasLiked = !post.userHasLiked;

            postsService.like(post.id).then(
                function(response) {
                    post.likesCount = response.likesCount;
                    post.userHasLiked = response.userHasLiked;
                }
            );
        };

        vm.postComment = function(newComment, post, event) {
            if (event.key === 'Enter') {
                if (newComment) {
                    var comment = {
                        text: newComment.text,
                    };

                    commentService.createComment(comment, post.id).then(
                        function(response) {
                            if (!post.comments) {
                                post.comments = [];
                            }

                            post.comments.push(response);
                            post.commentsCount = post.comments.length;
                        });

                    newComment.text = null;
                }
            }
        };

        vm.viewMoreCommentsClick = function(post) {
            postsService.getComments(post.id).then(
                function(response) {
                    post.comments = response;
                },
                function(error) {
                    vm.errorMessage = error;
                }
            );
        };

        vm.newPostCaptionFocusLost = function() {
            vm.newPost.value = '';
        };

        vm.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        vm.copyLink = function(post) {
            $state.go('post', {
                postId: post.id
            });
        };

        vm.previous = function() {
            if (vm.post.activeAttachment > 0) {
                vm.post.activeAttachment--;
            }
        }

        vm.next = function() {
            if (vm.post.activeAttachment < vm.post.attachments.length - 1) {
                vm.post.activeAttachment++;
            }
        }

        $scope.$watch("vm.authService.isAuthenticated",
            function(isAuthenticated) {
                vm.isAuthenticated = isAuthenticated;
            });

        vm.$onInit = function() {
            vm.post.activeAttachment = 0;
        };
    };
})();