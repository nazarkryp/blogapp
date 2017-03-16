angular.module('photocloud').filter('difference', ['$filter', function ($filter) {
    return function (postDate) {
        var currentDate = new Date();

        var msPerSecond = 1000;
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerWeek = msPerDay * 7;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var parsed = Date.parse(postDate);
        var date = new Date(parsed);
        var elapsed = currentDate.getTime() - date.getTime();

        if (elapsed < msPerMinute) {
            var difference = Math.round(elapsed / msPerSecond);

            if (difference > 1) {
                return difference + ' seconds ago';
            } else {
                return difference + ' second ago';
            }
        } else if (elapsed < msPerHour) {
            var difference = Math.round(elapsed / msPerMinute);

            if (difference > 1) {
                return difference + ' minutes ago';
            } else {
                return difference + ' minute ago';
            }
        } else if (elapsed < msPerDay) {
            var difference = Math.round(elapsed / msPerHour);

            if (difference > 1) {
                return difference + ' hours ago';
            } else {
                return difference + ' hour ago';
            }
        } else if (elapsed < msPerWeek) {
            var difference = Math.round(elapsed / msPerDay);

            if (difference > 1) {
                return difference + ' days ago';
            } else {
                return difference + ' day ago';
            }
        } else if (elapsed < msPerMonth) {
            var difference = Math.round(elapsed / msPerWeek);

            if (difference > 1) {
                return difference + ' weeks ago';
            } else {
                return difference + ' week ago';
            }
        } else if (elapsed < msPerYear) {
            var difference = Math.round(elapsed / msPerMonth);

            if (difference > 1) {
                return difference + ' monts ago';
            } else {
                return difference + ' months ago';
            }
        } else {
            var difference = Math.round(elapsed / msPerYear);

            if (difference > 1) {
                return difference + ' years ago';
            } else {
                return difference + ' year ago';
            }
        }
    };
}]);