const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const config = require('./sourcePath');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');

const css = () => {
	return gulp
		.src('css/*.css')
		.pipe(concatCss('app.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('publish/css'))
		.pipe(browserSync.stream());
};

const js = () => {
	return gulp
		.src('js/*.js')
		.pipe(minify())
		.pipe(gulp.dest('publish/js'))
		.pipe(browserSync.stream());
};

const html = () => {
	return gulp
		.src('./html/index.html')
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

const serve = () => {
	browserSync.init({
		server: './',
	});
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
	gulp.watch('css/*.css', css);
	gulp.watch('js/*.js', js);
	gulp.watch('html/*.html', html);
	gulp.watch('./*.html').on('change', browserSync.reload);
};

gulp.task('build', build);

gulp.task('default', gulp.series(build, serve, watch));
