const {
  src, series, parallel, task, dest, watch,
} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const pump = require('pump');
const eslint = require('gulp-eslint');
const styleLint = require('gulp-stylelint');
const htmlHint = require('gulp-htmlhint');
const sourcePath = require('./config/sourcePath');

let isDev = false;

const toggleIsDev = (done) => {
  isDev = !isDev;
  done();
};

const cssLint = (callback) => {
  const result = [
    src(sourcePath.proprietary.src.css),
    styleLint({
      debug: true,
      failAfterError: true,
      reporters: [{ console: true, formatter: 'string' }],
    }),
  ];

  pump(result, callback);
};

const css = (callback) => {
  const result = [src(sourcePath.proprietary.src.css), concatCss('app.css')];

  if (!isDev) {
    result.push(cleanCSS({ compatibility: 'ie8', level: 2 }));
  }

  result.push(dest(sourcePath.proprietary.dest.css), browserSync.stream());

  pump(result, callback);
};

const jsLint = (callback) => {
  const result = [
    src(sourcePath.proprietary.src.js),
    eslint(),
    eslint.format(),
    eslint.failAfterError(),
  ];

  pump(result, callback);
};

const js = (callback) => {
  const result = [
    src(sourcePath.proprietary.src.js),
    babel({
      presets: ['@babel/env'],
    }),
  ];

  result.push(sourcemaps.init());

  if (!isDev) {
    result.push(uglify());
  }

  result.push(sourcemaps.write());

  result.push(dest(sourcePath.proprietary.dest.js), browserSync.stream());

  pump(result, callback);
};

const htmlLint = (callback) => {
  const result = [
    src(sourcePath.proprietary.src.html),
    htmlHint('.htmlhintrc'),
    htmlHint.reporter(),
    htmlHint.failOnError(),
  ];

  pump(result, callback);
};

const html = (callback) => {
  const result = [src(sourcePath.proprietary.src.html)];

  if (!isDev) {
    result.push(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      }),
    );
  }

  result.push(dest(sourcePath.proprietary.dest.html), browserSync.stream());

  pump(result, callback);
};

const publishJsVendors = (done) => {
  src(sourcePath.vendors.src.js).pipe(dest(sourcePath.vendors.dest.js));
  done();
};

const publishCssVendors = (done) => {
  src(sourcePath.vendors.src.css).pipe(dest(sourcePath.vendors.dest.css));
  done();
};

const publishFontRobotoVendors = (done) => {
  src(sourcePath.vendors.src.fonts.roboto).pipe(dest(sourcePath.vendors.dest.fonts.roboto));
  done();
};

const publishFontAwesomeVendors = (done) => {
  src(sourcePath.vendors.src.fonts.fontAwesome).pipe(
    dest(sourcePath.vendors.dest.fonts.fontAwesome),
  );
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

const build = series(
  parallel(
    series(cssLint, css),
    series(jsLint, js),
    publishJsVendors,
    publishCssVendors,
    publishFontRobotoVendors,
    publishFontAwesomeVendors,
  ),
  series(htmlLint, html),
);

const watchFiles = () => {
  watch(sourcePath.proprietary.src.css, series(cssLint, css, reload));
  watch(sourcePath.proprietary.src.js, series(jsLint, js, reload));
  watch(sourcePath.proprietary.src.html, series(htmlLint, html, reload));
};

task('build', build);

task('styleLint', series(cssLint));

task('eslint', series(jsLint));

task('htmlLint', series(htmlLint));

task('default', series(toggleIsDev, build, serve, watchFiles));
