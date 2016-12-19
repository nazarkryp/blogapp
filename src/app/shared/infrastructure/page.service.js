angular.module('blogapp')
    .service('PageService', function () {
        this.title = 'Photocloud';
        this.isLoading = false;
    });