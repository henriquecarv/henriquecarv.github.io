'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const config = require('./sourcePath');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');

const paths = {
	js: 'js/*.js',
	css: 'css/*.css',
	html: 'html/index.html',
};

const css = () => {
	return gulp
		.src(paths.css)
		.pipe(concatCss('app.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('publish/css'))
		.pipe(browserSync.stream());
};

const js = () => {
	return gulp
		.src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('publish/js'))
		.pipe(browserSync.stream());
};

const html = () => {
	return gulp
		.src(paths.html)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
				removeEmptyAttributes: true,
			})
		)
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream());
};

const publishJsVendors = () => {
	return gulp
		.src(config.jsVendorsSourcePath)
		.pipe(gulp.dest(config.jsVendorsDestPath));
};

const publishCssVendors = () => {
	return gulp
		.src(config.cssVendorsSourcePath)
		.pipe(gulp.dest(config.cssVendorsDestPath));
};

const publishFontRobotoVendors = () => {
	return gulp
		.src(config.fontVendorsRobotoSourcePath)
		.pipe(gulp.dest(config.fontVendorsRobotoDestPath));
};

const publishFontMaterialVendors = () => {
	return gulp
		.src(config.fontVendorsMaterialSourcePath)
		.pipe(gulp.dest(config.fontVendorsMaterialDestPath));
};

const publishFontAwesomeVendors = () => {
	return gulp
		.src(config.fontVendorsFontAwesomeSourcePath)
		.pipe(gulp.dest(config.fontVendorsFontAwesomeDestPath));
};

const reload = done => {
	browserSync.reload();
	done();
};

const serve = done => {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
	done();
};

const build = gulp.series(
	gulp.parallel(
		css,
		js,
		publishJsVendors,
		publishCssVendors,
		publishFontRobotoVendors,
		publishFontMaterialVendors,
		publishFontAwesomeVendors
	),
	html
);

const watch = () => {
	gulp.watch(paths.css, gulp.series(css, reload));
	gulp.watch(paths.js, gulp.series(js, reload));
	gulp.watch(paths.html, gulp.series(html, reload));
};

gulp.task('build', build);

gulp.task('default', gulp.series(build, serve, watch));
