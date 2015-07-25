var gulp = require('gulp'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create();

var paths = {
  dist: './dist',
  app: './app'
};

gulp.task('js', function() {
  return gulp.src(paths.app + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('html', function() {
  return gulp.src(paths.app + '/**/*.html')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });
});

gulp.task('watch', function() {

  gulp.watch(paths.app + "/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['html', 'js', 'watch', 'serve']);