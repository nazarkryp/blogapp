(function() {
    'use strict';

    angular.module('photocloud')
        .controller('ExplorePeopleController', ExplorePeopleController);

    ExplorePeopleController.$inject = ['peopleService', 'userService', 'authService', 'pageService'];

    function ExplorePeopleController(peopleService, userService, authService, pageService) {
        var vm = this;

        vm.pageService = pageService;
        vm.currentUserId = authService.userId;

        vm.group = {
            users: [],
            hasMoreItems: false,
            pageIndex: 0,
            pageSize: 5
        };

        vm.invertRelationshipsWithUser = function(user) {
            userService.invertRelationshipsWithUser(user.id)
                .then(
                    function(response) {
                        user.relationships.outgoingStatus = response;
                    });
        };

        vm.getUsers = function() {
            vm.pageService.isLoading = true;

            peopleService.getUsers(vm.group.pageIndex + 1, vm.group.pageSize)
                .then(
                    function(response) {
                        vm.group.users = vm.group.users.concat(response.items);
                        vm.group.pageIndex = response.pageIndex;
                        vm.group.hasMoreItems = response.hasMoreItems;
                        vm.pageService.isLoading = false;
                    },
                    function(error) {
                        vm.pageService.isLoading = false;
                    }
                );
        };

        vm.$onInit = function() {
            vm.getUsers();

            vm.pageService.title = 'Photocloud - Discover People';
        };
    }
})();