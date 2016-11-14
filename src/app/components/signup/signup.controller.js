angular.module('blogapp')
    .controller('SignUpController', ['$scope', '$state', '$mdDialog', 'SignUpService', 'UploadService',
        function ($scope, $state, $mdDialog, SignUpService, UploadService) {
            $scope.isUploading = false;
            $scope.browsedFile = {
                file : null
            };
            $scope.user = {
                Attachment: {}
            };

            $scope.gotoSignInPage = function () {
                $state.go('signin');
            };

            $scope.signUp = function (user) {
                if ($scope.attachment) {
                    user.Attachment = $scope.attachment;
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

            $scope.$watch("browsedFile.file", function (file) {
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
                            $scope.browsedFile.file = null;
                        },
                        function (error) {
                            console.log('ERROR: ' + error);
                            $scope.isUploading = false;
                            $scope.browsedFile.file = null;
                        },
                        function (notify) {
                            console.log('Notify: ' + notify);
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