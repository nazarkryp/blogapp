angular.module('blogapp')
    .service('pageService', function () {
        this.title = 'Photocloud';
        this.isLoading = false;
    });