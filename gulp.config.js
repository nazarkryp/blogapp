module.exports = function () {
    var root = './';
    var temp = './tmp/';

    var nodeModules = 'node_modules';
    var clientApp = './src/app/';

    var config = {
        build: './build/',
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'blogapp',
                root: 'app/',
                standAlone: false
            }
        },
        htmltemplates: clientApp + '**/*.html',
        jsfiles : clientApp + '**/*.js'
    };

    return config;
};