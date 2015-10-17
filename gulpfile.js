var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'specs/**/*.js'], ['test']);
});

gulp.task('test', function () {
  return gulp.src('specs/**/*.js')
    .pipe(jasmine());
});
