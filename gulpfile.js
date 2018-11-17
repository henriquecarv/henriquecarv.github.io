const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const pump = require('pump');
const sourcePath = require('./sourcePath');

let isDev = false;

const toggleIsDev = (done) => {
  isDev = !isDev;
  done();
};

const css = (cb) => {
  const result = [gulp.src(sourcePath.proprietary.src.css), concatCss('app.css')];

  if (!isDev) {
    result.push(cleanCSS({ compatibility: 'ie8' }));
  }

  result.push(gulp.dest(sourcePath.proprietary.dest.css), browserSync.stream());

  pump(result, cb);
};

const js = (cb) => {
  const result = [
    gulp.src(sourcePath.proprietary.src.js),
    babel({
      presets: ['@babel/env'],
    }),
  ];

  if (!isDev) {
    result.push(uglify());
  } else {
    result.push(sourcemaps.init(), sourcemaps.write());
  }

  result.push(gulp.dest(sourcePath.proprietary.dest.js), browserSync.stream());

  pump(result, cb);
};

const html = (cb) => {
  const result = [gulp.src(sourcePath.proprietary.src.html)];

  if (!isDev) {
    result.push(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      }),
    );
  }

  result.push(gulp.dest(sourcePath.proprietary.dest.html), browserSync.stream());

  pump(result, cb);
};

const publishJsVendors = (done) => {
  gulp.src(sourcePath.vendors.src.js).pipe(gulp.dest(sourcePath.vendors.dest.js));
  done();
};

const publishCssVendors = (done) => {
  gulp.src(sourcePath.vendors.src.css).pipe(gulp.dest(sourcePath.vendors.dest.css));
  done();
};

const publishFontRobotoVendors = (done) => {
  gulp
    .src(sourcePath.vendors.src.fonts.roboto)
    .pipe(gulp.dest(sourcePath.vendors.dest.fonts.roboto));
  done();
};

const publishFontMaterialVendors = (done) => {
  gulp
    .src(sourcePath.vendors.src.fonts.material)
    .pipe(gulp.dest(sourcePath.vendors.dest.fonts.material));
  done();
};

const publishFontAwesomeVendors = (done) => {
  gulp
    .src(sourcePath.vendors.src.fonts.fontAwesome)
    .pipe(gulp.dest(sourcePath.vendors.dest.fonts.fontAwesome));
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
  gulp.watch(sourcePath.proprietary.src.css, gulp.series(css, reload));
  gulp.watch(sourcePath.proprietary.src.js, gulp.series(js, reload));
  gulp.watch(sourcePath.proprietary.src.html, gulp.series(html, reload));
};

gulp.task('build', build);

gulp.task('default', gulp.series(toggleIsDev, build, serve, watch));
