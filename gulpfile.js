var gulp = require('gulp'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  eslint = require('gulp-eslint'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();

var paths = {
  dist: './dist',
  app: './app',
  bower_components: './bower_components'
};

gulp.task('icons', function() {
    gulp.src(paths.bower_components + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest(paths.dist));
});

gulp.task('css', function() {

  var files = [
    paths.bower_components+'/bootstrap/dist/css/bootstrap.css'
  ];

  gulp.src(files)
    .pipe(gulp.dest(paths.dist + '/css'));
});

function bundleScripts(files, outputFile, options) {
  options = options || {
    eslint: true,
    babel: true
  }
  var task = gulp.src(files);
  if(options.eslint) {
      task = task.pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
  }
  if(options.babel) {
    task = task.pipe(babel());
  }
  
  return task.pipe(concat(outputFile))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + '/js'));
}

gulp.task('js', function() {

  bundleScripts([
    paths.bower_components+'/angular/angular.js',
    paths.bower_components+'/angular-route/angular-route.js'
    ], 'angular.js', {
      eslint: false,
      babel: false
    });

  bundleScripts([paths.app + '/js/**/*.js'], 'app.js');
});

gulp.task('html', function() {
  gulp.src([paths.app + '/**/*.html', paths.app + '/*.ico'])
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

gulp.task('default', ['icons', 'html', 'js', 'css', 'serve']);