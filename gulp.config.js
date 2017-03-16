module.exports = function () {
    var root = './';
    var temp = './tmp/';

    var nodeModules = 'node_modules';
    var clientApp = './src/app/';
    var clientAppAssets = './src/assets/';

    var config = {
        build: './build/',
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'photocloud',
                root: 'app/',
                standAlone: false
            }
        },
        htmltemplates: clientApp + '**/*.html',
        jsfiles : clientAppAssets + '**/*.js'
    };

    return config;
};