angular.module('photocloud')
    .controller('PostDetailsController', ['$scope', '$state', '$stateParams', 'postsService', 'authService',
        function ($scope, $state, $stateParams, postsService, authService) {
            $scope.image = {
            };

            $scope.isLoading = false;

            var init = function () {
                $scope.image.maxHeight = window.innerHeight - 180;
                $scope.image.maxWidth = window.innerWidth * 75 / 100 - 400;

                $scope.isLoading = true;

                postsService.getPostById($stateParams.postId).then(
                    function (response) {
                        $scope.post = response;
                        $scope.isLoading = false;
                    }, function (error) {
                        $scope.isLoading = false;
                        console.log(error);
                    });
            };

            init();
        }])
    .directive('elementSize', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.ready(function () {
                    var height,
                        width;
                    $timeout(function () {
                        height = element[0].offsetHeight;
                        width = element[0].offsetWidth;
                        if (attrs.key) {
                            scope[attrs.key] = {
                                height: height,
                                width: width
                            };
                            return;
                        }

                        scope.elementSize = {
                            height: height,
                            width: width
                        };
                    }, 1000);
                });
            }
        };
    });