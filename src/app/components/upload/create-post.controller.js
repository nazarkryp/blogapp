angular.module('blogapp')
    .controller('CreatePostController', ['$scope', '$mdDialog', 'UploadService',
        function($scope, $mdDialog, UploadService) {
            $scope.post = {
            };

            $scope.createPost = function(post) {
                console.log(post);

                if (!post || !post.ImageUri) {
                    return;
                }

                UploadService.post(post).then(
                    function(response) {
                        $scope.post = response;
                        $mdDialog.hide($scope.post);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }]);