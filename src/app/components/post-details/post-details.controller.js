angular.module('blogapp')
    .controller('PostDetailsController', ['$scope', '$state', '$stateParams', 'PostsService', 'AuthService',
        function ($scope, $state, $stateParams, PostsService, AuthService) {
            $scope.maxHeight = window.innerHeight - 150;
            $scope.maxWidth = window.innerWidth * 75 / 100 - 400;

            var init = function () {
                PostsService.getPostById($stateParams.postId).then(
                    function (response) {
                        $scope.post = response;
                    }, function (error) {
                        console.log(error);
                    });
            };

            init();
        }]);