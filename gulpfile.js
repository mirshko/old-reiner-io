// **********
// ** Gulp **
// **********

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var surge = require('gulp-surge');

// ***********
// ** Tasks **
// ***********

// DEFAULT
gulp.task('default', ['styles', 'browser-sync'], function() {
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

// DEPLOY
gulp.task('deploy', function() {
	return surge({
		project: './', // PATH TO YOUR STATIC BUILD DIRECTORY
		domain: 'reiner.space' // YOUR DOMAIN OR SURGE SUBDOMAIN
	});
});
