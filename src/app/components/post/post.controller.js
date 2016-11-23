angular.module('blogapp')
    .controller('PostController', ['$scope', 'PostsService', 'AuthService', 'DateCalculatorService', 'post',
        function($scope, PostsService, AuthService, DateCalculatorService, post) {
            $scope.post = post;
            $scope.isAuthenticated = AuthService.authenticated;
            $scope.currentuserId = AuthService.userId;

            $scope.difference = function(postDate) {
                return DateCalculatorService.getDifference(postDate);
            };

            $scope.viewMoreCommentsClick = function(post) {
                PostsService.getComments(post.Id).then(
                    function(response) {
                        post.Comments = response;
                    }, function(error) {
                        console.log(error);
                    }
                );
            };
        }]);