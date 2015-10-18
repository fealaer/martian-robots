var gulp = require('gulp')
  , jasmine = require('gulp-jasmine')
  , browserify = require('gulp-browserify')
  , clean = require('gulp-clean')
  , serve = require('gulp-serve');

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'specs/**/*.js'], ['test', 'build']);
});

gulp.task('test', function () {
  return gulp.src('specs/**/*.js')
    .pipe(jasmine());
});

gulp.task('clean', function (cb) {
  return gulp.src('public/*.js', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean'], function () {
  gulp.src('src/web-app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./public/'));
});

gulp.task('serve', ['build'], serve('public'));
