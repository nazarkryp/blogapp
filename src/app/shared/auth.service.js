angular.module('blogapp').service("AuthService", ["$window",
    function ($window) {
        var self = this;
        var sessionInfo;

        this.getSessionInfo = function () {
            var session = $window.localStorage.getItem("session");

            if (session) {
                sessionInfo = angular.fromJson(session);
            }

            return sessionInfo;
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

        this.userId = function () {
            var session = self.getSessionInfo();

            if (session) {
                return session["userId"];
            }
        };

        this.Authenticated = this.isAuthenticated();
        this.UserId = this.userId();

        this.signIn = function (session) {
            sessionInfo = session;
            var json = angular.toJson(session);
            $window.localStorage.setItem("session", json);
            self.Authenticated = true;
            self.Username = session.userName;
        };

        this.signOut = function () {
            sessionInfo = null;
            $window.localStorage.clear();
            self.Authenticated = false;
        };
    }]);