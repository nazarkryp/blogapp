angular.module('blogapp')
    .service('UploadService', ['$q', '$http', 'HttpService', 'ConstService',
        function($q, $http, HttpService, ConstService) {
            //var dbx = new Dropbox({ accessToken: 'ZszjdHgxD_QAAAAAAAASF7IxL1LBh6g8LVQ0ABvjKLCcTfmbPX6B5pg9dXW_ZbSn' });

            this.post = function(post) {
                var deferred = $q.defer();

                HttpService.post(ConstService.baseAddress + 'api/posts', post, deferred);

                return deferred.promise;

                // $http.defaults.headers.common['Authorization'] = 'Bearer ZszjdHgxD_QAAAAAAAASF7IxL1LBh6g8LVQ0ABvjKLCcTfmbPX6B5pg9dXW_ZbSn';
                // $http({
                //     method: 'POST',
                //     url: 'https://api.dropboxapi.com/2/sharing/get_shared_links',
                //     headers: {
                //         'Authorization': 'Bearer ZszjdHgxD_QAAAAAAAASF7IxL1LBh6g8LVQ0ABvjKLCcTfmbPX6B5pg9dXW_ZbSn'
                //     },
                //     data: {
                //         'path' : '/Public/file.mp3'
                //     }
                // }).then(function(response) {
                //     console.log(response);
                // }, function(error) {
                //     console.log(error);
                // });
            };
            // ZszjdHgxD_QAAAAAAAASF7IxL1LBh6g8LVQ0ABvjKLCcTfmbPX6B5pg9dXW_ZbSn

            /*https://www.dropbox.com/oauth2/authorize?client_id=1jjh8sailfi0ueu&response_type=token&redirect_uri=https://localhost/authorize
              https://localhost/authorize#access_token=ZszjdHgxD_QAAAAAAAASF7IxL1LBh6g8LVQ0ABvjKLCcTfmbPX6B5pg9dXW_ZbSn&token_type=bearer&uid=64185161&account_id=dbid%3AAADDFhivVj9Co--5-5ow5fFligwOvDQJSxA
            */
        }]);