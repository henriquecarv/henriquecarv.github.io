// Include gulp
var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var concatCss = require("gulp-concat-css");
var browserSync = require("browser-sync").create();
var config = require("./sourcePath");
var htmlmin = require("gulp-htmlmin");
// var jshint = require("gulp-jshint");
var minify = require("gulp-minify");

gulp.task("css", function () {
    gulp.src("css/*.css")
        .pipe(concatCss("app.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("publish/css"))
        .pipe(browserSync.stream());
});

gulp.task("js", function () {
    gulp.src("js/*.js")
        // .pipe(jshint())
        // .pipe(jshint.reporter("default"))
        // .pipe(jshint.reporter("fail"))
        .pipe(minify())
        .pipe(gulp.dest("publish/js"))
        .pipe(browserSync.stream());
});

gulp.task("html", function () {
    gulp.src("./html/index.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true
        }))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

gulp.task("publishJsVendors", function () {
    gulp.src(config.jsVendorsSourcePath)
        .pipe(gulp.dest(config.jsVendorsDestPath));
});

gulp.task("publishCssVendors", function () {
    gulp.src(config.cssVendorsSourcePath)
        .pipe(gulp.dest(config.cssVendorsDestPath));
});

gulp.task("publishFontRobotoVendors", function () {
    gulp.src(config.fontVendorsRobotoSourcePath)
        .pipe(gulp.dest(config.fontVendorsRobotoDestPath));
});

gulp.task("publishFontAwesomeVendors", function () {
    gulp.src(config.fontVendorsFontAwesomeSourcePath)
        .pipe(gulp.dest(config.fontVendorsFontAwesomeDestPath));
});

gulp.task("serve", function () {
    browserSync.init({
        server: "./"
    });
});

gulp.task("default", ["serve", "html", "css", "js", "publishJsVendors", "publishCssVendors", "publishFontRobotoVendors", "publishFontAwesomeVendors"], function () {
    gulp.watch("css/*.css", ["css"]);
    gulp.watch("js/*.js", ["js"]);
    gulp.watch("./html/*.html", ["html"]);
    gulp.watch("./*.html").on("change", browserSync.reload);
});