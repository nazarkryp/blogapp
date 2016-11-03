angular.module('blogapp')
    .controller('FeedController', ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
        $scope.title = 'Feed controller loaded';

        $scope.posts = [];

        var init = function () {
            for (var i = 0; i < 3; i++) {
                var post = {
                    imageUrl: "https://pp.vk.me/c637319/v637319861/c03b/76rAbwOPEj4.jpg",
                    title: "This is post title",
                    content: "The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well...",
                    isLiked: true
                };

                if (i % 2 === 0) {
                    post.isLiked = false;
                }

                $scope.posts.push(post);
            }
        };
        
        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };


        $scope.like = function (post) {
            post.isLiked = !post.isLiked;
        };

        init();
    }]);