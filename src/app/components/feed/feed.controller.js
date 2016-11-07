angular.module('blogapp')
    .controller('FeedController', ['$scope', '$state', '$stateParams', '$mdDialog', 'PostsService', 'AuthService',
        function ($scope, $state, $stateParams, $mdDialog, PostsService, AuthService) {
            $scope.authService = AuthService;
            $scope.isAuthenticated = false;
            $scope.isLoading = false;
            $scope.posts = [];
            $scope.newPost = {
            };

            $scope.$watch("authService.Authenticated",
                function (value) {
                    $scope.isAuthenticated = value;
                });

            var init = function () {
                $scope.getFeed($stateParams.id);
            };

            $scope.newPostCaptionFocusLost = function () {
                $scope.newPost.value = '';
            };

            $scope.openMenu = function ($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            $scope.getFeed = function (userId) {
                $scope.isLoading = true;

                PostsService.getPosts(userId)
                    .then(function (response) {
                        $scope.posts = response;
                        $scope.isLoading = false;
                    },
                    function (error) {
                        $scope.isLoading = false;
                        $scope.errorMessage = error;
                    });
            };

            $scope.viewMoreCommentsClick = function (post) {
                PostsService.getComments(post.Id).then(
                    function (response) {
                        post.Comments = response;
                    },
                    function (error) {
                        $scope.errorMessage = error;
                    }
                );
            };

            $scope.postComment = function (newComment, post, event) {
                if (event.key === 'Enter') {
                    if (newComment) {
                        var comment = {
                            Text: newComment.Text,
                        };

                        PostsService.postComment(comment, post.Id).then(
                            function (response) {
                                post.Comments.push(response);
                            },
                            function (error) {
                                $scope.errorMessage = error;
                            });

                        newComment.Text = null;
                    }
                }
            };

            $scope.like = function (post) {
                PostsService.like(post.Id).then(
                    function (response) {
                        post.UserHasLiked = response.UserHasLiked;
                    },
                    function (error) {
                        $scope.errorMessage = error;
                    }
                );
            };

            init();
        }])
    .service("DataSource", [function () {
        this.posts = [
            {
                Id: 1,
                ImageUri: "https://pp.vk.me/c637319/v637319861/c03b/76rAbwOPEj4.jpg",
                Caption: "#carpathianmountains #zaharberkut  @ Carpathian Mountains, Ukraine",
                Created: "11.05.2016",
                UserHasLiked: true,
                User: {
                    Id: 1,
                    Username: "nazarkryp",
                    ProfileImageUri: "https://pp.vk.me/c637628/v637628861/8dcf/VODaYD0PGeQ.jpg"
                },
                Comments: [
                    {
                        Id: 1,
                        Text: "Very beautiful",
                        User: {
                            Id: 2,
                            Username: "viktoriia"
                        }
                    },
                    {
                        Id: 2,
                        Text: "Cool photo",
                        User: {
                            Id: 3,
                            Username: "olexiydimashok"
                        }
                    },
                    {
                        Id: 3,
                        Text: "When was that?",
                        User: {
                            Id: 3,
                            Username: "nadiyakozak"
                        }
                    },
                    {
                        Id: 4,
                        Text: "This september ",
                        User: {
                            Id: 1,
                            Username: "nazarkryp"
                        }
                    }],
                Likes: [
                    {
                        Id: 1,
                        Username: "nazarkryp"
                    },
                    {
                        Id: 2,
                        Username: "viktoriia"
                    },
                    {
                        Id: 3,
                        Username: "olexiydimashok"
                    },
                    {
                        Id: 4,
                        Username: "nadiyakozak"
                    },
                    {
                        Id: 5,
                        Username: "vitaliktsonio"
                    }
                ],
                CommentsCount: 4,
                LikesCount: 5
            },
            {
                Id: 2,
                ImageUri: "https://pp.vk.me/c630320/v630320251/43abb/kP03oDbpGds.jpg",
                Caption: "My lovely 😍#partyhard #celebration #friends 🎉🎊👑✨ @ Lviv, Ukraine",
                Created: "11.05.2016",
                UserHasLiked: true,
                User: {
                    Id: 2,
                    Username: "viktoriia",
                    ProfileImageUri: "https://pp.vk.me/c630320/v630320251/4de8c/IMC7dcDq1Jo.jpg"
                },
                Comments: [
                    {
                        Id: 5,
                        Text: "Very beautiful, sweety",
                        User: {
                            Id: 1,
                            Username: "nazarkryp"
                        }
                    },
                    {
                        Id: 6,
                        Text: "Cool photo",
                        User: {
                            Id: 3,
                            Username: "olexiydimashok"
                        }
                    },
                    {
                        Id: 7,
                        Text: "When was that?",
                        User: {
                            Id: 3,
                            Username: "nadiyakozak"
                        }
                    },
                    {
                        Id: 8,
                        Text: "This september ",
                        User: {
                            Id: 1,
                            Username: "nazarkryp"
                        }
                    }],
                Likes: [
                    {
                        Id: 1,
                        Username: "nazarkryp"
                    },
                    {
                        Id: 2,
                        Username: "viktoriia"
                    },
                    {
                        Id: 3,
                        Username: "olexiydimashok"
                    },
                    {
                        Id: 4,
                        Username: "nadiyakozak"
                    },
                    {
                        Id: 5,
                        Username: "vitaliktsonio"
                    }
                ],
                CommentsCount: 4,
                LikesCount: 5
            },
            {
                Id: 3,
                ImageUri: "https://pp.vk.me/c638217/v638217861/4156/PCHC4TmVmgs.jpg",
                Caption: "My lovely 😍#мявчик",
                Created: "11.05.2016",
                UserHasLiked: true,
                User: {
                    Id: 1,
                    Username: "nazarkryp",
                    ProfileImageUri: "https://pp.vk.me/c637628/v637628861/8dcf/VODaYD0PGeQ.jpg"
                },
                Comments: [
                    {
                        Id: 5,
                        Text: "Very beautiful, sweety",
                        User: {
                            Id: 1,
                            Username: "nazarkryp"
                        }
                    },
                    {
                        Id: 10,
                        Text: "So sweet photo. You have so nice cat",
                        User: {
                            Id: 1,
                            Username: "lanafeshchuk"
                        }
                    }],
                Likes: [
                    {
                        Id: 1,
                        Username: "nazarkryp"
                    },
                    {
                        Id: 2,
                        Username: "viktoriia"
                    },
                    {
                        Id: 3,
                        Username: "olexiydimashok"
                    },
                    {
                        Id: 4,
                        Username: "nadiyakozak"
                    },
                    {
                        Id: 5,
                        Username: "vitaliktsonio"
                    }
                ],
                CommentsCount: 2,
                LikesCount: 5
            }
        ];
    }]);