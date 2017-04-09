(function() {
    'use strict';

    angular.module('photocloud')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['$scope', '$mdDialog', 'uploadService', 'postsService', 'Upload'];

    function CreatePostController($scope, $mdDialog, uploadService, postsService, $upload) {
        var vm = this;

        vm.post = {
            caption: "",
            attachments: [],
            attachmentIds: []
        };

        vm.createPost = function() {
            $mdDialog.hide(vm.post);
        };

        vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.upload = function(file) {
            vm.progress = 0;

            if (!file || file.error) {
                return;
            }
            vm.isUploading = true;

            $upload.upload({
                url: 'https://kryptogram.azurewebsites.net/api/attachments/upload',
                data: {
                    file: file
                }
            }).progress(function(e) {
                vm.progress = Math.round((e.loaded * 100.0) / e.total);
            }).success(function(data, status, headers, config) {
                vm.isUploading = false;
                vm.post.attachments.push(data);
                vm.post.attachmentIds = vm.post.attachments.map(function(attachment) {
                    return attachment.id;
                });
            }).error(function(data, status, headers, config) {
                vm.isUploading = false;
                file.result = data;
            });
        }
    }
})();