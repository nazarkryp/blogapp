(function() {
    'use strict';

    angular.module('photocloud')
        .service('toast', toast)

    toast.$inject = ['$mdToast'];

    function toast($mdToast) {
        this.show = function(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position('bottom right')
                .hideDelay(2000)
            );
        }
    }
})();