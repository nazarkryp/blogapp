angular.module('blogapp').service("AuthService", ["$window",
    function ($window) {
        var self = this;

        this.getSessionInfo = function () {
            var session = $window.localStorage.getItem("session");

            if (session) {
                return angular.fromJson(session);
            }

            return null;
        };

        this.isAuthenticated = function () {
            var session = self.getSessionInfo();

            if (session) {
                var token = session["access_token"];
                self.Username = session["userName"];

                if (token) {
                    return true;
                }

                return false;
            }

            return false;
        };

        this.getUserId = function () {
            var session = self.getSessionInfo();

            if (session) {
                return session["userId"];
            }
        };

        this.getUsername = function () {
            var session = self.getSessionInfo();

            if (session) {
                return session["userName"];
            }
        };

        this.signIn = function (session) {
            var json = angular.toJson(session);
            $window.localStorage.setItem("session", json);

            self.authenticated = true;
            self.userId = session.userId;
            self.username = session.userName;
        };

        this.signOut = function () {
            $window.localStorage.clear();
            self.authenticated = false;
        };

        this.authenticated = this.isAuthenticated();
        this.userId = this.getUserId();
        this.username = this.getUsername();
    }]);