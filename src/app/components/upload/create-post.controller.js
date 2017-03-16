(function () {
    'use strict';

    angular.module('photocloud')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['$scope', '$mdDialog', 'uploadService', 'postsService'];

    function CreatePostController($scope, $mdDialog, uploadService, postsService) {
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

        $scope.previewUrl = function () {
            if ($scope.attachment && $scope.attachment.url) {
                return $scope.attachment.url;
            } else if ($scope.external && $scope.external.url) {
                return $scope.external.url;
            }
        };

        $scope.browse = function () {
            uploadInput.click();
        };

        $scope.$watch('external.url', function (url) {
            if (url) {
                $scope.browsed.file = null;
                $scope.preview.url = url;
                $scope.isExternal = true;
                $scope.attachment = null;
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
                uploadService.uploadFile(file)
                    .then(function (response) {
                        $scope.isUploading = false;
                        $scope.attachment = response;
                        $scope.preview.url = $scope.attachment.url;
                        $scope.external.url = null;
                        $scope.browsed.file = null;
                        $scope.isExternal = false;
                    },
                    function (error) {
                        console.log('ERROR: ' + error);
                        $scope.isUploading = false;
                        $scope.browsed.file = null;
                        $scope.attachment = null;
                    },
                    function (notify) {
                        console.log('Notify: ' + notify);
                    });
            }
        };

        $scope.createPost = function (post) {
            if (!$scope.isExternal) {
                post.attachment = $scope.attachment;
                post.isExternal = false;
            } else {
                post.Attachment = {
                    url: $scope.external.url
                };

                post.isExternal = true;
            }

            $mdDialog.hide(post);
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }


})();