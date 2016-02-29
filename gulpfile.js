var gulp = require('gulp'); 
var concat = require('gulp-concat'); 

gulp.task('buildJS', function() {
  return gulp.src(['browser/app/app.js', 'browser/**/*.js'])
    .pipe(concat('main.js'))  
    .pipe(gulp.dest('dest/scripts')); 
}); 


