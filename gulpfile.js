var _ = require('lodash');
var gulp = require('gulp');
var config = require('./gulp.config')();
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('templatecache', function() {
    console.log('creating angularjs $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe(minifyHtml({ empty: true }))
        .pipe(templateCache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.build));
});

gulp.task('concat-scripts', function() {
    return gulp.src(config.jsfiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.build));
});

gulp.task('concat-libs', function() {
    return gulp.src(config.jsfiles)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(config.build));
});

gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + '**/*.js'
    );

    clean(files, done);
});

gulp.task('copy-assets', function() {
    var assets = {
        js: [
            './node_modules/angular/angular.min.js',
            './node_modules/angular-ui-router/release/angular-ui-router.min.js',
            './node_modules/angular-material/angular-material.min.js',
            './node_modules/angular-animate/angular-animate.min.js',
            './node_modules/angular-aria/angular-aria.min.js',
            './node_modules/angular-messages/angular-messages.min.js',
            // './node_modules/angular-sanitize/angular-sanitize.min.js',
        ],
        css: [
            './node_modules/angular-material/angular-material.min.css'
        ]
    };
    _(assets).forEach(function(asset, type) {
        gulp.src(asset).pipe(gulp.dest('./src/assets/libs/' + type));
    });
});

gulp.task("default", ['clean-code', 'copy-assets']);

function clean(files, done) {
    del(files, done);
}