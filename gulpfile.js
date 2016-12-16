// Include gulp
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');

gulp.task('css', function () {
    gulp.src('css/*.css')
        .pipe(concatCss('app.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('publish/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
        .pipe(gulp.dest('publish/js'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        server: "./"
    });
})

gulp.task('default', ['serve', 'css', 'js'], function () {
    gulp.watch('css/*.css', ['css']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});