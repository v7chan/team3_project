var gulp = require('gulp');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;

var paths = {
  scss: './scss/*.scss'
};

gulp.task('styles', function () {
  return gulp.src(paths.scss)
      .pipe(sass({
        includePaths: ['styles'].concat(neat)
      }))
      .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('default',function(){
  gulp.start('styles');
  gulp.watch('./scss/*', function(){
    gulp.run('styles');
  });
});