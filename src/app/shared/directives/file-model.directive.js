angular.module('photocloud')
    .directive("fileModel", ["$parse", function ($parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var setter = model.assign;

                element.bind("change", function () {
                    scope.$apply(function () {
                        setter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);