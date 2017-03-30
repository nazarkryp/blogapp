(function() {
    'use strict';

    angular.module('photocloud')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', '$state', '$mdDialog', 'authService', 'userService', 'pageService'];

    function IndexController($scope, $state, $mdDialog, authService, userService, pageService) {
        var vm = this;

        vm.authService = authService;
        vm.pageService = pageService;

        vm.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        vm.signOut = function() {
            vm.authService.signOut();

            if ($state.current.name !== 'feed') {
                $state.go('signin');
            }
        };

        vm.acceptRequest = function(index) {
            var request = vm.requests[index];

            userService.responseIncommingRequest(request.id, true).then(
                function(response) {
                    vm.requests.splice(index, 1);
                });
        };

        vm.rejectRequest = function(index) {
            var request = vm.requests[index];

            userService.responseIncommingRequest(request.id, false).then(
                function(response) {
                    vm.requests.splice(index, 1);
                });
        };

        $scope.$watch('vm.authService.isAuthenticated',
            function(isAuthenticated) {
                if (isAuthenticated) {
                    getUserFromSession();

                    if (vm.currentUser && vm.currentUser.isActive && vm.currentUser.isPrivate) {
                        getIncommingRequests();
                    }
                } else {
                    vm.currentUser = null;
                }
            });

        $scope.$watch('vm.authService.isActive',
            function(isActive) {
                if (vm.currentUser) {
                    vm.currentUser.isActive = isActive;

                    if (isActive && vm.authService.getIsPrivate()) {
                        getIncommingRequests();
                    }
                }
            });

        $scope.$watch('vm.authService.imageUri',
            function(imageUri) {
                if (vm.currentUser) {
                    vm.currentUser.imageUri = imageUri;
                }
            });

        $scope.$watch('vm.authService.isPrivate',
            function(isPrivate) {
                if (vm.currentUser) {
                    vm.currentUser.isPrivate = isPrivate;

                    if (vm.authService.getIsActive() && isPrivate) {
                        getIncommingRequests();
                    }
                }
            });

        function getIncommingRequests() {
            if (vm.currentUser.isPrivate) {
                userService.getIncommingRequests().then(
                    function(response) {
                        vm.requests = response;
                    });
            }
        };

        function getUserFromSession() {
            vm.currentUser = {
                userId: vm.authService.userId,
                username: vm.authService.username,
                imageUri: vm.authService.imageUri,
                isPrivate: vm.authService.isPrivate,
                isActive: vm.authService.isActive,
                isAuthenticated: vm.authService.isAuthenticated
            };
        };

        vm.$onInit = function() {
            getUserFromSession();

            vm.date = new Date();
        }
    }
})();