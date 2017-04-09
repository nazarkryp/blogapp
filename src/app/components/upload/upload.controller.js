(function () {
    'use strict';

    angular.module('photocloud')
        .controller('UploadController', UploadController);

    UploadController.$inject = ['Upload'];

    function UploadController($upload) {
        var vm = this;

        vm.upload = function (file) {
            if (!file || file.error) {
                return;
            }

            console.log('upload started...');

            //https://kryptogram.azurewebsites.net/api/attachments/upload
            $upload.upload({
                url: "https://api.cloudinary.com/v1_1/dpfmyl1mn/upload",
                data: {
                    upload_preset: 'sdcyaird',
                    file: file
                }
            }).progress(function (e) {
                var progress = Math.round((e.loaded * 100.0) / e.total);
                file.progress = progress;
                file.status = "Uploading... " + file.progress + "%";
                console.log('Progress: ' + progress);
            }).success(function (data, status, headers, config) {
                file.result = data;
                console.log('success');
                console.log(data);
            }).error(function (data, status, headers, config) {
                file.result = data;
                console.log('error');
                console.log(data);
            });
        };
    }
})();