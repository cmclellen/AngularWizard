var gulp = require('gulp'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create();

var paths = {
  dist: './dist',
  app: './app',
  bower_components: './bower_components'
};

gulp.task('css', function() {

  var files = [
    paths.bower_components+'/bootstrap/dist/css/bootstrap.css'
  ];

  return gulp.src(files)
    .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('js', function() {
  return gulp.src(paths.app + '/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('html', function() {
  return gulp.src([paths.app + '/**/*.html', paths.app + '/*.ico'])
    .pipe(gulp.dest(paths.dist));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  });

  gulp.watch(paths.app + "/css/**/*.css", ['js']).on('change', browserSync.reload);  
  gulp.watch(paths.app + "/js/**/*.js", ['js']).on('change', browserSync.reload);  
  gulp.watch(paths.app + "/*.html", ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['html', 'js', 'css', 'serve']);