angular.module('blogapp')
    .controller('CreatePostController', ['$scope', '$mdDialog', 'UploadService',
        function ($scope, $mdDialog, UploadService) {
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

            $scope.previewUrl = function () {
                if ($scope.attachment && $scope.attachment.Url) {
                    return $scope.attachment.Url;
                } else if ($scope.external && $scope.external.Url) {
                    return $scope.external.Url;
                }
            };

            $scope.browse = function () {
                uploadInput.click();
            };

            $scope.$watch('external.Url', function (url) {
                if (url) {
                    $scope.browsed.file = null;
                    $scope.preview.Url = url;
                }
            });

            $scope.$watch("browsed.file", function (file) {
                if (file) {
                    uploadImage(file);
                }
            });

            var uploadImage = function (file) {
                $scope.isUploading = true;

                if (file) {
                    UploadService.uploadFile(file)
                        .then(function (response) {
                            $scope.isUploading = false;
                            $scope.attachment = response;
                            $scope.preview.Url = $scope.attachment.Url;
                            $scope.external.Url = null;
                            $scope.browsed.file = null;
                        },
                        function (error) {
                            console.log('ERROR: ' + error);
                            $scope.isUploading = false;
                            $scope.browsed.file = null;
                        },
                        function (notify) {
                            console.log('Notify: ' + notify);
                        });
                }
            }

            $scope.createPost = function (post) {
                if ($scope.attachment) {
                    post.Attachment = $scope.attachment;

                    UploadService.post(post).then(
                        function (response) {
                            $scope.post = response;
                            $mdDialog.hide($scope.post);
                        },
                        function (error) {
                            console.log(error);
                        }
                    );
                } else if ($scope.external) {

                }
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        }]);