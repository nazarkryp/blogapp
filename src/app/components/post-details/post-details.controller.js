angular.module('blogapp')
    .controller('PostDetailsController', ['$scope', '$state', '$stateParams', 'PostsService', 'AuthService',
        function ($scope, $state, $stateParams, PostsService, AuthService) {
            $scope.image = {
            };

            var init = function () {
                $scope.image.maxHeight = window.innerHeight - 180;
                $scope.image.maxWidth = window.innerWidth * 75 / 100 - 400;

                PostsService.getPostById($stateParams.postId).then(
                    function (response) {
                        $scope.post = response;
                    }, function (error) {
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