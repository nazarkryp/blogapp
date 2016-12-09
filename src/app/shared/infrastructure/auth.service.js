angular.module('blogapp')
    .service("AuthService", ['$window',
        function ($window) {
            var self = this;
            //this.sessionBackup = {};

            this.getSession = function () {
                var json = $window.localStorage.getItem('session');

                if (json) {
                    var session = angular.fromJson(json);

                    // if (self.sessionBackup && self.sessionBackup.userId && self.sessionBackup.userId != session.userId) {
                    //     ErrorsService.showErrorMessage('Current session has been expired');

                    //     return;
                    // }

                    //self.sessionBackup = session;

                    var expires = new Date(session['.expires']);
                    var currentDate = new Date();

                    if (currentDate < expires && session['access_token'] && session['userName']) {
                        return session;
                    } else {
                        self.userId = null;
                        self.username = null;
                        self.imageUri = null;
                        self.authenticated = false;
                    }

                    self.signOut();
                }

                return null;
            };

            this.isAuthenticated = function () {
                var session = self.getSession();

                if (session) {
                    return true;
                }

                return false;
            };

            this.getUserId = function () {
                var session = self.getSession();

                return session ? session["userId"] : null;
            };

            this.getUsername = function () {
                var session = self.getSession();

                return session ? session["userName"] : null;
            };

            this.getImageUri = function () {
                var session = self.getSession();

                return session ? session["imageUri"] : null;
            };

            this.signIn = function (session) {
                var json = angular.toJson(session);

                $window.localStorage.setItem("session", json);

                self.userId = session.userId;
                self.username = session.userName;
                self.imageUri = session.imageUri;
                self.authenticated = true;
            };

            this.signOut = function () {
                $window.localStorage.clear();

                self.userId = null;
                self.username = null;
                self.imageUri = null;
                self.authenticated = false;
            };

            this.authenticated = self.isAuthenticated();
            this.userId = self.getUserId();
            this.username = self.getUsername();
            this.imageUri = self.getImageUri();
        }]);