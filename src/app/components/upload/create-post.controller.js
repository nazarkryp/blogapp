angular.module('blogapp')
    .controller('CreatePostController', ['$scope', '$mdDialog', 'UploadService',
        function($scope, $mdDialog, UploadService) {
            $scope.post = {
            };

            $scope.createPost = function(post) {
                UploadService.post();

                $mdDialog.hide('POST CREATED');
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }]);