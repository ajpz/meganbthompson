var gulp = require('gulp'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify'); 
var ngAnnotate = require('gulp-ng-annotate'); 
var babel = require('gulp-babel'); 
var plumber = require('gulp-plumber'); 
var sourcemaps = require('gulp-sourcemaps'); 
var eslint = require('gulp-eslint'); 
var notify = require('gulp-notify');
var livereload = require('gulp-livereload'); 
var runSeq = require('run-sequence');

// Dev Tasks
//-----------------------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('reloadCSS', function () {
    return gulp.src('./public/style.css').pipe(livereload());
});

// Linter 
gulp.task('lintJS', function () {

    return gulp.src(['./browser/**/*.js', './server/**/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError('Linting FAILED! Check your gulp process.')
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

// Build scripts
gulp.task('buildJS', ['lintJS'], function() {
  return gulp.src(['browser/app/app.js', 'browser/**/*.js'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))  
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dest/scripts')); 
}); 


// Productions Tasks
//-----------------------------------------------------------------------------
gulp.task('buildJSProduction', function() {
  return gulp.src(['browser/app/app.js', 'browser/**/*.js'])
    .pipe(concat('main.js')) 
    .pipe(babel()) 
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dest/scripts')); 
}); 

// Composed tasks
//-----------------------------------------------------------------------------
gulp.task('build', function() {
  if(process.env.NODE_ENV === 'production') {
    runSeq(['buildJSProduction']); 
  } else {
    runSeq(['buildJS']); 
  }
}); 

gulp.task('default', function () {

    gulp.start('build');

    // Run when anything inside of browser/ changes.
    gulp.watch('browser/app/**', function () {
        runSeq('buildJS', 'reload');
    });

    // Run when anything inside of browser/scss changes.
//    gulp.watch('browser/scss/**', function () {
//        runSeq('buildCSS', 'reloadCSS');
//    });

    gulp.watch('server/**/*.js', ['lintJS']);

    // Reload when a template (.html) file changes.
    gulp.watch(['browser/**/*.html', '*.html'], ['reload']);

    // Run server tests when a server file or server test file changes.
 //   gulp.watch(['tests/server/**/*.js'], ['testServerJS']);

    // Run browser testing when a browser test file changes.
 //   gulp.watch('tests/browser/**/*', ['testBrowserJS']);

    livereload.listen();

});