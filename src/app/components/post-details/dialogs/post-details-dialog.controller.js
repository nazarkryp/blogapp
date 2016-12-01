angular.module('blogapp')
    .controller('PostDetailsDialogController', ['$scope', 'PostsService', 'AuthService', 'post',
        function ($scope, PostsService, AuthService, post) {
            $scope.post = post;
            $scope.isAuthenticated = AuthService.authenticated;
            $scope.currentuserId = AuthService.userId;

            $scope.maxHeight = window.innerHeight * 75 / 100;
            $scope.maxWidth = window.innerWidth * 75 / 100 - 400;

            $scope.viewMoreCommentsClick = function (post) {
                PostsService.getComments(post.id).then(
                    function (response) {
                        post.comments = response;
                    }, function (error) {
                        console.log(error);
                    }
                );
            };
        }]);