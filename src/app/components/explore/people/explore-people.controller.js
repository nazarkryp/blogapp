(function() {
    'use strict';

    angular.module('blogapp')
        .controller('ExplorePeopleController', ExplorePeopleController);

    ExplorePeopleController.$inject = ['peopleService', 'userService', 'authService', 'pageService'];

    function ExplorePeopleController(peopleService, userService, authService, pageService) {
        var vm = this;

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
            pageService.isLoading = true;

            peopleService.getUsers(vm.group.pageIndex + 1, vm.group.pageSize)
                .then(
                    function(response) {
                        vm.group.users = vm.group.users.concat(response.items);
                        vm.group.pageIndex = response.pageIndex;
                        vm.group.hasMoreItems = response.hasMoreItems;
                        pageService.isLoading = false;
                    },
                    function(error) {
                        pageService.isLoading = false;
                    }
                );
        };

        vm.$onInit = function() {
            vm.getUsers();

            pageService.title = 'Photocloud - Discover People';
        };
    }
})();