"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');			// run local server
var open = require('gulp-open');				// open web browser
var browserify = require('browserify');			// bundle js
var source = require('vinyl-source-stream');	// needs Gulp
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');
var babelify = require('babelify');
var gutil = require('gulp-util');

var config = {
	port: 8000,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/*.js',
		css: [
            './src/styles/bootstrap.min.css',
            './src/styles/toastr.min.css',
			'./src/styles/terminal.css'
		],
        images: './src/images/**/*',
		dist: '../static',
		mainJs: './src/index.js',
        startPage: 'dist/index.html'
	}
};


gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('flask', shell.task([
  'python server.py'
]));

gulp.task('open', [], function(){
	gulp.src(config.paths.startPage)
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});


gulp.task('css', function(){
	gulp.src(config.paths.css)
		//.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('images', function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(eslint({'config': 'eslint.config.json'}))
		.pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('watch', function(){
    console.log('----watch----');
	gulp.watch('./src/{,**/}*.js', ['lint', 'scripts']);
});

gulp.task('scripts', function () {
    bundleApp();
});

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp() {
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: config.paths.mainJs,
    	debug: true
  	});

  	appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error', console.error.bind(console))
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest(config.paths.dist + '/scripts'));
}

//gulp.task('default', ['html', 'js', 'lint', 'css', 'images', 'open', 'watch']);
gulp.task('build', ['lint', 'html', 'css', 'images', 'scripts']);
gulp.task('default', ['lint', 'html', 'css', 'images', 'scripts', 'open', 'watch']);

