angular.module('photocloud')
    .service('pageService', function() {
        this.title = 'Photocloud';
        this.isLoading = false;
        this.navbarVisible = true;
    });