angular.module('photocloud').controller('FullScreenController', ['$stateParams', FullScreen]);

function FullScreen($stateParams) {
    var self = this;
    self.imageUri = $stateParams.url;

    var init = function () {
        console.log(self.imageUri);
    };

    init();
};