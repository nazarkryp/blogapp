(function() {
    'use strict';

    angular.module('photocloud')
        .controller('ExploreController', ExploreController);

    ExploreController.$inject = ['$state', '$stateParams'];

    function ExploreController($state, $stateParams) {
        var vm = this;

        vm.header = 'EXPLORE';

        var init = function() {
            if ($state.current.name === 'explore.people') {
                vm.header = 'PEOPLE';
            } else if ($state.current.name === 'explore.tags') {
                vm.header = 'TAGS';
            } else {
                vm.header = 'Unknown';
            }
        };

        init();
    }
})();