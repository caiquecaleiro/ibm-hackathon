var gulp = require('gulp');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('lint', function() {
  gulp.src(['./src/**/*.js', '!./bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  return gulp.src(['src/**/*.css'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('dist/src/'));
});

gulp.task('minify-js', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/src/'));
});

gulp.task('copy-bower-components', function() {
  return gulp.src('bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/src/'));
});

gulp.task('connect', function() {
  connect.server({
    root: ['src'],
    port: 8080,
    livereload: true,
    middleware: function(connect) {
      return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});

gulp.task('connectDist', function() {
  connect.server({
    root: ['dist/src/'],
    port: 8080,
    livereload: true,
    middleware: function(connect) {
      return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});

gulp.task('default', function() {
  runSequence(
    'lint',
    'connect'
  );
});

gulp.task('build', function() {
  runSequence(
    'lint',
    'clean',
    ['minify-css', 'minify-js'],
    'copy-html-files',
    'copy-bower-components',
    'connectDist'
  );
});
