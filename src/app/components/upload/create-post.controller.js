angular.module('blogapp')
    .controller('CreatePostController', ['$scope', '$mdDialog', 'UploadService', 'PostsService',
        function($scope, $mdDialog, UploadService, PostsService) {
            $scope.isUploading = false;

            $scope.post = {
            };

            $scope.browsed = {
                file: null
            };

            $scope.attachment = {
            };

            $scope.external = {
            };

            $scope.preview = {
            };

            $scope.isExternal = false;

            $scope.previewUrl = function() {
                if ($scope.attachment && $scope.attachment.Url) {
                    return $scope.attachment.Url;
                } else if ($scope.external && $scope.external.Url) {
                    return $scope.external.Url;
                }
            };

            $scope.browse = function() {
                uploadInput.click();
            };

            $scope.$watch('external.Url', function(url) {
                if (url) {
                    $scope.browsed.file = null;
                    $scope.preview.Url = url;
                    $scope.isExternal = true;
                    $scope.attachment = null;
                }
            });

            $scope.$watch("browsed.file", function(file) {
                if (file) {
                    uploadImage(file);
                }
            });

            var uploadImage = function(file) {
                $scope.isUploading = true;

                if (file) {
                    UploadService.uploadFile(file)
                        .then(function(response) {
                            $scope.isUploading = false;
                            $scope.attachment = response;
                            $scope.preview.Url = $scope.attachment.Url;
                            $scope.external.Url = null;
                            $scope.browsed.file = null;
                            $scope.isExternal = false;
                        },
                        function(error) {
                            console.log('ERROR: ' + error);
                            $scope.isUploading = false;
                            $scope.browsed.file = null;
                            $scope.attachment = null;
                        },
                        function(notify) {
                            console.log('Notify: ' + notify);
                        });
                }
            };

            $scope.createPost = function(post) {
                if (!$scope.isExternal) {
                    post.Attachment = $scope.attachment;
                    post.isExternal = false;
                } else {
                    post.Attachment = {
                        Url: $scope.external.Url
                    };

                    post.isExternal = true;
                }

                $mdDialog.hide(post);
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }]);