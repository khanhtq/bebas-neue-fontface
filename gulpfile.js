var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var compass = require('gulp-compass');
var rename = require("gulp-rename");
var minifyCSS = require('gulp-minify-css');

var config = {
    cssDir: './css',
    fontDir: './fonts',
    sassDir: './sass',
    miniSuffix: ".min"
};

gulp.task('clean', function(callback) {
    del([config.cssDir + '/*'], callback);
});
gulp.task('build', ['css']);

gulp.task('css', function() {
    var compassConfig = {
        css: config.cssDir,
        sass: config.sassDir,
        environment: 'development',
        style: 'expanded',
        comments: true
    };

    return gulp.src(config.sassDir + '/*.scss')

    // Writing development version.
    .pipe(compass(compassConfig))
        .pipe(gulp.dest(config.cssDir))

    // Writing minified version.
    .pipe(rename({ suffix: config.miniSuffix }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.cssDir));
});

gulp.task('default', function(callback) {
    runSequence('clean', 'build', callback);
});

gulp.task('watch', function() {
    gulp.watch(config.sassDir + '/**/*', ['clean', 'build'], function() {});
});
