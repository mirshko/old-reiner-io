var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var surge = require('gulp-surge')


// DEFAULT
gulp.task('default', ['sass', 'browser-sync'], function() {
    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// BROWSER-SYNC
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// COMPILE SASS
gulp.task('sass', function() {
    return gulp.src("./sass/**/*.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});

// DEPLOY TO SURGE.SH
gulp.task('deploy', [], function() {
    return surge({
        project: './', // PATH TO YOUR STATIC BUILD DIRECTORY
        domain: 'reiner.io' // YOUR DOMAIN OR SURGE SUBDOMAIN
    });
});