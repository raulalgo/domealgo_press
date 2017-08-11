var gulp        = require('gulp');
var sass        = require('gulp-sass');
var jshint      = require('gulp-jshint');
var concat      = require('gulp-concat');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('sass', function(){

  gulp.src('./css/src/*.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(gulp.dest('./css'));

});

gulp.task('js', function(){

  gulp.src('js/src/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function(){

  gulp.watch('css/src/*.scss', ['sass']);
  gulp.watch('js/src/*.js', ['js']);
  gulp.watch('img/src/*.{png,jpg,gif}', ['img']);

});

gulp.task('browser-sync', function(){
  var files = [
    './style.css',
    './*.php'
  ];

  browserSync.init(files,{
    proxy:"localhost:8888",
    notify: false
  });
});

gulp.task('default', ['sass', 'js', 'watch', 'browser-sync']);
