(function() {
    'use strict';

    angular.module('photocloud')
        .controller('ErrorController', ErrorController);

    ErrorController.$inject = ['error'];

    function ErrorController(error) {
        var vm = this;

        vm.error = error;
    }
})();