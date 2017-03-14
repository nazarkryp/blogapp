angular.module('blogapp').controller('IndexController', ['$scope', '$state', '$mdDialog', 'authService', 'userService', 'pageService',
    function ($scope, $state, $mdDialog, authService, userService, pageService) {
        $scope.authService = authService;
        $scope.pageService = pageService;

        $scope.currentUser = {
            userId: authService.userId,
            username: authService.username,
            imageUri: authService.imageUri,
            isPrivate: authService.isPrivate,
            isActive: authService.isActive,
            isAuthenticated: authService.isAuthenticated
        };

        $scope.gotoProfile = function () {
            $state.go('userfeed', { username: authService.username });
        };

        $scope.gotoSignInPage = function () {
            $state.go('signin');
        };

        $scope.gotoSignUpPage = function () {
            $state.go('signup');
        };

        $scope.gotoFeedPage = function () {
            $state.go('feed');
        };

        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $scope.$watch('authService.isAuthenticated',
            function (isAuthenticated) {
                if (isAuthenticated) {
                    getAuthenticatedUser();

                    if ($scope.currentUser && $scope.currentUser.isActive && $scope.currentUser.isPrivate) {
                        getIncommingRequests();
                    }
                } else {
                    $scope.currentUser = null;
                }
            });

        $scope.$watch('authService.isActive',
            function (isActive) {
                if (!$scope.currentUser) {
                    return;
                }

                $scope.currentUser.isActive = isActive;

                if (isActive && authService.getIsPrivate()) {
                    getIncommingRequests();
                }
            });

        $scope.$watch('authService.imageUri',
            function (imageUri) {
                if (!$scope.currentUser) {
                    return;
                }

                $scope.currentUser.imageUri = imageUri;
            });

        $scope.$watch('authService.isPrivate',
            function (isPrivate) {
                if (!$scope.currentUser) {
                    return;
                }

                $scope.currentUser.isPrivate = isPrivate;

                if ($scope.currentUser && authService.getIsActive() && isPrivate) {
                    getIncommingRequests();
                }
            });

        $scope.$watch('pageService.isLoading',
            function (isLoading) {
                $scope.isLoading = isLoading;
            });


        $scope.signOut = function () {
            authService.signOut();

            if ($state.current.name !== 'feed') {
                $state.go('signin');
            }
        };

        $scope.acceptRequest = function (index) {
            var request = $scope.requests[index];

            userService.responseIncommingRequest(request.id, true).then(
                function (response) {
                    $scope.requests.splice(index, 1);
                });
        };

        $scope.rejectRequest = function (index) {
            var request = $scope.requests[index];

            userService.responseIncommingRequest(request.id, false).then(
                function (response) {
                    $scope.requests.splice(index, 1);
                });
        };

        function getIncommingRequests() {
            if ($scope.currentUser.isPrivate) {
                userService.getIncommingRequests().then(
                    function (response) {
                        $scope.requests = response;
                    });
            }
        };

        function getAuthenticatedUser() {
            $scope.currentUser = {
                userId: authService.userId,
                username: authService.username,
                imageUri: authService.imageUri,
                isPrivate: authService.isPrivate,
                isActive: authService.isActive,
                isAuthenticated: authService.isAuthenticated
            };
        };

        getAuthenticatedUser();
    }]);