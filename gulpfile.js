const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const config = require('./sourcePath');

const paths = {
  js: 'js/*.js',
  css: 'css/*.css',
  html: 'html/index.html',
};

let isDev = false;

const toggleIsDev = (done) => {
  isDev = !isDev;
  done();
};

const css = () => {
  let result = gulp.src(paths.css).pipe(concatCss('app.css'));

  if (!isDev) {
    result = result.pipe(cleanCSS({ compatibility: 'ie8' }));
  }

  result = result.pipe(gulp.dest('publish/css')).pipe(browserSync.stream());

  return result;
};

const js = () => {
  let result = gulp.src(paths.js).pipe(
    babel({
      presets: ['@babel/env'],
    }),
  );

  if (!isDev) {
    result = result
      .pipe(uglify())
      .pipe(gulp.dest('publish/js'))
      .pipe(browserSync.stream());
  } else {
    result = result
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('publish/js'))
      .pipe(browserSync.stream());
  }

  return result;
};

const html = () => {
  let result = gulp.src(paths.html);

  if (!isDev) {
    result = result.pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      }),
    );
  }

  result = result.pipe(gulp.dest('./')).pipe(browserSync.stream());

  return result;
};

const publishJsVendors = (done) => {
  gulp.src(config.jsVendorsSourcePath).pipe(gulp.dest(config.jsVendorsDestPath));
  done();
};

const publishCssVendors = (done) => {
  gulp.src(config.cssVendorsSourcePath).pipe(gulp.dest(config.cssVendorsDestPath));
  done();
};

const publishFontRobotoVendors = (done) => {
  gulp.src(config.fontVendorsRobotoSourcePath).pipe(gulp.dest(config.fontVendorsRobotoDestPath));
  done();
};

const publishFontMaterialVendors = (done) => {
  gulp
    .src(config.fontVendorsMaterialSourcePath)
    .pipe(gulp.dest(config.fontVendorsMaterialDestPath));
  done();
};

const publishFontAwesomeVendors = (done) => {
  gulp
    .src(config.fontVendorsFontAwesomeSourcePath)
    .pipe(gulp.dest(config.fontVendorsFontAwesomeDestPath));
  done();
};

const reload = (done) => {
  browserSync.reload();
  done();
};

const serve = (done) => {
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
    publishFontAwesomeVendors,
  ),
  html,
);

const watch = () => {
  gulp.watch(paths.css, gulp.series(css, reload));
  gulp.watch(paths.js, gulp.series(js, reload));
  gulp.watch(paths.html, gulp.series(html, reload));
};

gulp.task('build', build);

gulp.task('default', gulp.series(toggleIsDev, build, serve, watch));
