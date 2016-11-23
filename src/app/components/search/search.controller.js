angular.module('blogapp')
    .controller('SearchController', ['$scope', '$timeout', '$q', 'SearchService',
        function ($scope, $timeout, $q, SearchService) {
            $scope.states = loadAll();
            $scope.selectedItem = null;
            $scope.searchText = null;
            $scope.querySearch = searchUsers;

            // $scope.searchTextChange = function (searchQuery) {
            //     $scope.users = [];

            //     if (searchQuery) {
            //         SearchService.search(searchQuery).then(function (response) {
            //             $scope.users = response;
            //         });
            //     } else {
            //         $scope.users = [];
            //     }
            // };

            function querySearch(query) {
                var results = query ? $scope.states.filter(createFilterFor(query)) : $scope.states;
                var deferred = $q.defer();

                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);

                return deferred.promise;
            }

            function searchUsers(searchQuery) {
                if (searchQuery) {
                    return SearchService.search(searchQuery);
                }

                var items = [];
                var deferred = $q.defer();
                deferred.resolve(items);
                return deferred.promise;
            }

            function loadAll() {
                var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

                return allStates.split(/, +/g).map(function (state) {
                    return {
                        value: state.toLowerCase(),
                        display: state
                    };
                });
            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(state) {
                    return (state.value.indexOf(lowercaseQuery) === 0);
                };

            }
        }]);