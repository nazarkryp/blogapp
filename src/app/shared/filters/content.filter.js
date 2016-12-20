angular.module('blogapp').filter('content', ['$filter', '$sce',
    function ($filter, $sce) {
        return function (text, target, type) {
            if (!text) {
                return text;
            }

            if (text.includes('#')) {
                // text = text.replace(/#(\S*)/g, '<a href="/#/explore/tags/$1" target="_blank">#$1</a>');

                text = text.replace(/#(\w+)/g, "<a class='hashtag' href='/#/explore/tags/$1' target='_blank'>$&</a>");
            }

            if (text.includes('@')) {
                text = text.replace(/@(\w+)/g, "<a class='hashtag' href='/#/$1' target='_blank'>$&</a>");
            }

            $sce.trustAsHtml(text);

            return text;
        };
    }]);