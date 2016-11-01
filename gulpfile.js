var _ = require('lodash'),
    gulp = require('gulp');

gulp.task('copy-assets', function () {
    var assets = {
        js: [
            './node_modules/angular/angular.min.js',
            './node_modules/angular-ui-router/release/angular-ui-router.min.js',
            './node_modules/angular-material/angular-material.min.js',
            './node_modules/angular-animate/angular-animate.min.js',
            './node_modules/angular-aria/angular-aria.min.js',
        ],
        css: [
            './node_modules/angular-material/angular-material.min.css'
        ]
    };
    _(assets).forEach(function (asset, type) {
        gulp.src(asset).pipe(gulp.dest('./src/assets/libs/' + type));
    });
});

gulp.task("default", ["copy-assets"]);