angular.module('photocloud')
    .controller('SearchController', ['$scope', '$state', '$q', 'SearchService',
        function($scope, $state, $q, SearchService) {
            $scope.selectedItem = null;
            $scope.searchText = null;

            $scope.search = function(searchQuery) {
                if (searchQuery) {
                    return SearchService.search(searchQuery);
                }

                var items = [];
                var deferred = $q.defer();
                deferred.resolve(items);
                return deferred.promise;
            }

            $scope.selectedItemChange = function(selectedItem) {
                if (selectedItem) {
                    $state.go('userfeed', { username: selectedItem.username });
                    $scope.selectedItem = null;
                }
            };
        }]);