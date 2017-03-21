(function() {
    'use strict';

    angular.module('photocloud')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['$scope', '$mdDialog', 'uploadService', 'postsService'];

    function CreatePostController($scope, $mdDialog, uploadService, postsService) {
        var vm = this;

        vm.post = {
            caption: "",
            attachments: [],
            attachmentIds: []
        };

        vm.browsed = {
            isUploading: false,
            file: null
        };

        vm.selectAttachment = function() {
            uploadInput.click();
        };

        $scope.$watch("vm.browsed.file", function(file) {
            if (file) {
                uploadAttachment(file);
            }
        });

        vm.createPost = function() {
            $mdDialog.hide(vm.post);
        };

        vm.cancel = function() {
            $mdDialog.cancel();
        };

        function uploadAttachment(file) {
            vm.browsed.isUploading = true;

            if (file) {
                uploadService.uploadFile(file)
                    .then(function(response) {
                            vm.browsed.isUploading = false;
                            vm.post.attachments.push(response);
                            vm.post.attachmentIds = vm.post.attachments.map(function(attachment) {
                                return attachment.id;
                            });
                            vm.browsed.file = null;
                        },
                        function(error) {
                            vm.browsed.isUploading = false;
                            vm.browsed.file = null;
                        });
            }
        };
    }
})();