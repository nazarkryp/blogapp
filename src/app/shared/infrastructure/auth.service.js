angular.module('photocloud')
    .service("authService", ['$window',
        function ($window) {
            var self = this;

            this.setValue = function (key, value) {
                var session = self.getSession();
                session[key] = value;

                var json = angular.toJson(session);

                $window.localStorage.clear();
                $window.localStorage.setItem("session", json);
            };

            this.getSession = function () {
                var json = $window.localStorage.getItem('session');

                if (json) {
                    var session = angular.fromJson(json);
                    var expires = new Date(session['.expires']);
                    var currentDate = new Date();

                    if (currentDate < expires && session['access_token'] && session['userName']) {
                        return session;
                    }

                    self.signOut();
                }

                return null;
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

            this.getIsActive = function () {
                var session = self.getSession();

                return session ? session["isActive"] : false;
            };

            this.getIsPrivate = function () {
                var session = self.getSession();

                return session ? session["isPrivate"] : false;
            };

            this.getIsAuthenticated = function () {
                var session = self.getSession();

                return session ? true : false;
            };

            this.signIn = function (session) {
                session.isActive = session.isActive === 'true';
                session.isPrivate = session.isPrivate  === 'true';

                var json = angular.toJson(session);

                $window.localStorage.setItem("session", json);

                self.userId = session.userId;
                self.username = session.userName;
                self.imageUri = session.imageUri;
                self.isActive = session.isActive;
                self.isPrivate = session.isPrivate;
                self.isAuthenticated = true;
            };

            this.signOut = function () {
                self.userId = null;
                self.username = null;
                self.imageUri = null;
                self.isPrivate = false;
                self.isActive = false;
                self.isAuthenticated = false;

                $window.localStorage.clear();
            };

            this.userId = self.getUserId();
            this.username = self.getUsername();
            this.imageUri = self.getImageUri();
            this.isActive = self.getIsActive();
            this.isPrivate = self.getIsPrivate();
            this.isAuthenticated = self.getIsAuthenticated();
        }]);