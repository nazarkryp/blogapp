angular.module('blogapp')
    .controller('SignUpController', ['$scope', '$state', '$mdDialog', 'SignUpService', 'UploadService',
        function ($scope, $state, $mdDialog, SignUpService, UploadService) {
            $scope.file = null;
            $scope.user = {
                AttachmentId: 0
            };

            $scope.gotoSignInPage = function () {
                $state.go('signin');
            };

            $scope.signUp = function (user) {
                if ($scope.attachment) {
                    user.AttachmentId = $scope.attachment.Id;
                }
                showLoadingDialog();
                SignUpService.signUp(user).then(
                    function (response) {
                        $mdDialog.hide();
                        $state.go('signin');
                    },
                    function (error) {
                        $mdDialog.hide();
                        $scope.errorMessage = error.error_description;
                    }
                );
            };

            $scope.browse = function () {
                uploadInput.click();
            };

            $scope.$watch("file",
                function (data) {
                    if (data) {
                        uploadImage();
                    }
                });

            var uploadImage = function () {
                $scope.uploaded = false;
                if ($scope.file) {
                    UploadService.uploadFile($scope.file)
                        .then(function (response) {
                            $scope.uploaded = true;
                            $scope.attachment = response;
                        },
                        function (error) {
                            console.log(error);
                            $scope.uploaded = false;
                        });
                }
            };

            var showLoadingDialog = function () {
                $mdDialog.show({
                    contentElement: '#myDialog',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                });
            };
        }]);