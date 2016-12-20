angular.module('blogapp').controller('IndexController', ['$scope', '$state', '$mdDialog', 'AuthService', 'UserService', 'PageService',
    function ($scope, $state, $mdDialog, AuthService, UserService, PageService) {
        $scope.authService = AuthService;
        $scope.pageService = PageService;

        $scope.currentUser = {
            userId: AuthService.userId,
            username: AuthService.username,
            imageUri: AuthService.imageUri,
            isPrivate: AuthService.isPrivate,
            isActive: AuthService.isActive,
            isAuthenticated: AuthService.isAuthenticated
        };

        $scope.page = {
            title: null
        };

        $scope.gotoProfile = function () {
            $state.go('usersfeed', { username: AuthService.username });
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

        $scope.$watch('pageService.title',
            function (title) {
                if (title) {
                    $scope.page.title = title;
                }
            });

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

                if (isActive && AuthService.getIsPrivate()) {
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

                if ($scope.currentUser && AuthService.getIsActive() && isPrivate) {
                    getIncommingRequests();
                }
            });

        $scope.$watch('pageService.isLoading',
            function (isLoading) {
                $scope.isLoading = isLoading;
            });


        $scope.signOut = function () {
            AuthService.signOut();

            if ($state.current.name !== 'feed') {
                $state.go('signin');
            }
        };

        $scope.requests = [];

        $scope.acceptRequest = function (index) {
            var request = $scope.requests[index];

            UserService.responseIncommingRequest(request.id, true).then(
                function (response) {
                    $scope.requests.splice(index, 1);
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.rejectRequest = function (index) {
            var request = $scope.requests[index];

            UserService.responseIncommingRequest(request.id, false).then(
                function (response) {
                    $scope.requests.splice(index, 1);
                }, function (error) {
                    console.log(error);
                });
        };

        var getIncommingRequests = function () {
            if ($scope.currentUser.isPrivate) {
                UserService.getIncommingRequests().then(
                    function (response) {
                        $scope.requests = response;
                        console.log(response);
                    }, function (error) {
                        console.log(error);
                    });
            }
        };

        var getAuthenticatedUser = function () {
            $scope.currentUser = {
                userId: AuthService.userId,
                username: AuthService.username,
                imageUri: AuthService.imageUri,
                isPrivate: AuthService.isPrivate,
                isActive: AuthService.isActive,
                isAuthenticated: AuthService.isAuthenticated
            };
        };

        var init = function () {
            getAuthenticatedUser();
        };

        init();
    }]);