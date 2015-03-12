var Promise = require('bluebird');
var gulp = require('gulp');
var del = require('del');
var run = require('gulp-run');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var jsxcs = require('gulp-jsxcs');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var karma = require('gulp-karma');
var package = require('./package.json');

/**
 * Running Bower
 */
gulp.task('bower', function() {
  return new Promise(function(resolve, reject) {
    run('bower install').exec(function(err) {
      if (err) {
        return reject(err);
      }
      resolve(); // finished task
    });
  });
});

/**
 * Cleaning dist/ folder
 */
gulp.task('clean', function() {
  return new Promise(function(resolve, reject) {
    del(['build/**'], function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  })
});

gulp.task('copy-assets', function() {
  return gulp.src('./bower_components/bootstrap/dist/**', {base: './bower_components/bootstrap/dist'})
      .pipe(gulp.dest('./build/assets/bootstrap'));
});

gulp.task('html', function() {
  return gulp.src('./app/**/*.html', {base: './app'})
      .pipe(gulp.dest('./build'));
});

/**
 * Running livereload server
 */
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: './build'
    }
  });
});

/**
 * JSLint/JSHint validation
 */
gulp.task('lint', function() {
  return gulp.src(package.paths.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('jsxcs', function() {
  return gulp.src(package.paths.js)
      .pipe(jsxcs('./.jscsrc'));
});

/** JavaScript compilation */
gulp.task('js', function() {
  return browserify(package.paths.app)
      .transform(reactify)
      .bundle()
      .pipe(source(package.dest.app))
      .pipe(gulp.dest(package.dest.dist));
});

gulp.task('js:min', function() {
  return browserify(package.paths.app)
      .transform(reactify)
      .bundle()
      .pipe(source(package.dest.app))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(package.dest.dist));
});

/**
 * Compiling resources and serving application
 */
gulp.task('serve', ['copy-assets', 'js', 'html', 'server'], function() {
  return gulp.watch([
    './app/**/*.html', './app/**/*.js'
  ], [
    'js', 'html', browserSync.reload
  ]);
});

//
//gulp.task('serve:minified', ['bower', 'clean', 'lint', 'less:min', 'js:min', 'server'], function() {
//  return gulp.watch([
//    package.paths.js, package.paths.jsx, package.paths.html, package.paths.less
//  ], [
//    'lint', 'less:min', 'js:min', browserSync.reload
//  ]);
//});

var testFiles = [
  'test/spec/**/.js'
];
gulp.task('test', function() {
  return gulp.src(testFiles)
      .pipe(karma({
        configFile: 'test/karma.conf.js',
        action: 'run'
      }))
      .on('error', function(err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      });
});

gulp.task('deploy', ['clean', 'copy-assets']);
