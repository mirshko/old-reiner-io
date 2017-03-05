// **********
// ** Gulp **
// **********

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var surge = require('gulp-surge');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var xo = require('gulp-xo');

// ***********
// ** Tasks **
// ***********

// DEFAULT
gulp.task('default', ['styles', 'browser-sync'], function() {
	gulp.watch("./scss/**/*.scss", ['styles']);
	gulp.watch('./js/**/*.js', ['scripts']);
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

// SCRIPTS
gulp.task('scripts', function () {
	return gulp.src('js/**/*.js')
		.pipe(xo())
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/'));
});

// STYLES
gulp.task('styles', function () {
	return gulp.src('./scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/'));
});

// DEPLOY
gulp.task('deploy', function() {
	return surge({
		project: './', // PATH TO YOUR STATIC BUILD DIRECTORY
		domain: 'reiner.io' // YOUR DOMAIN OR SURGE SUBDOMAIN
	});
});
