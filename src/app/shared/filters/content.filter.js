angular.module('blogapp').filter('content', ['$filter', '$sce',
    function ($filter, $sce) {
        return function (text, target, type) {
            if (!text) return text;

            if (text.includes('#')) {
                var replacedText = text.replace(/#(\w+)/g, "<a class='hashtag' href='/#/" + target + "' target='_blank'>$&</a>");
            } else if (text.includes('@')) {
                var replacedText = text.replace(/@(\w+)/g, "<a class='hashtag' href='/#/" + '$&' + "' target='_blank'>$&</a>");
            }

            $sce.trustAsHtml(replacedText);
            return replacedText;
        };
    }]);