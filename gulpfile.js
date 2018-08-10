const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const config = require('./sourcePath');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');

gulp.task('css', () => {
	gulp
		.src('css/*.css')
		.pipe(concatCss('app.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('publish/css'))
		.pipe(browserSync.stream());
});

gulp.task('js', () => {
	gulp
		.src('js/*.js')
		.pipe(minify())
		.pipe(gulp.dest('publish/js'))
		.pipe(browserSync.stream());
});

gulp.task('html', () => {
	gulp
		.src('./html/index.html')
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
				removeEmptyAttributes: true
			})
		)
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream());
});

gulp.task('publishJsVendors', () => {
	gulp
		.src(config.jsVendorsSourcePath)
		.pipe(gulp.dest(config.jsVendorsDestPath));
});

gulp.task('publishCssVendors', () => {
	gulp
		.src(config.cssVendorsSourcePath)
		.pipe(gulp.dest(config.cssVendorsDestPath));
});

gulp.task('publishFontRobotoVendors', () => {
	gulp
		.src(config.fontVendorsRobotoSourcePath)
		.pipe(gulp.dest(config.fontVendorsRobotoDestPath));
});

gulp.task('publishFontMaterialVendors', () => {
	gulp
		.src(config.fontVendorsMaterialSourcePath)
		.pipe(gulp.dest(config.fontVendorsMaterialDestPath));
});

gulp.task('publishFontAwesomeVendors', () => {
	gulp
		.src(config.fontVendorsFontAwesomeSourcePath)
		.pipe(gulp.dest(config.fontVendorsFontAwesomeDestPath));
});

gulp.task('serve', () => {
	browserSync.init({
		server: './'
	});
});

gulp.task('build', [
	'html',
	'css',
	'js',
	'publishJsVendors',
	'publishCssVendors',
	'publishFontRobotoVendors',
	'publishFontMaterialVendors',
	'publishFontAwesomeVendors'
]);

gulp.task(
	'default',
	[
		'serve',
		'html',
		'css',
		'js',
		'publishJsVendors',
		'publishCssVendors',
		'publishFontRobotoVendors',
		'publishFontMaterialVendors',
		'publishFontAwesomeVendors'
	],
	() => {
		gulp.watch('css/*.css', ['css']);
		gulp.watch('js/*.js', ['js']);
		gulp.watch('./html/*.html', ['html']);
		gulp.watch('./*.html').on('change', browserSync.reload);
	}
);
