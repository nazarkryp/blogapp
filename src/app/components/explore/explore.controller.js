angular.module('blogapp').controller('ExploreController', ['$state', '$stateParams', function ($state, $stateParams) {
    var self = this;

    self.header = 'EXPLORE';

    var init = function () {
        if ($state.current.name === 'explore.people') {
            self.header = 'PEOPLE';
        } else if ($state.current.name === 'explore.tags') {
            self.header = 'TAGS';
        } else {
            self.header = 'Unknown';
        }
    };

    init();
}]);