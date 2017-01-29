var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	bourbon = require('bourbon'),
	neat = require('node-neat'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	imageop = require('gulp-image-optimization'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	child = require('child_process'),
	gutil = require('gulp-util'),
	prettify = require('gulp-jsbeautifier'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	run = require('gulp-run'),
	streamqueue  = require('streamqueue'),
	jekyllDir = './',
	siteDir = '_site',
	appDir = '_app';

var plumberErrorHandler = {
			errorHandler: notify.onError({
				title: 'Gulp',
				message: 'Error: <%= error.message %>'
			})
		};

var config = {
  drafts:     !!gutil.env.drafts      // pass --drafts flag to serve drafts
};

// Copy vendor libraries from /node_modules into /vendor
gulp.task('build:copy', function() {

	// Copy Fonts
	gulp.src(['node_modules/font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}'])
		.pipe(gulp.dest(siteDir+'/fonts/font-awesome'))
		.pipe(gulp.dest('fonts/font-awesome'));

	gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*.{ttf,woff,woff2,eof,svg}')
		.pipe(gulp.dest(siteDir+'/fonts'))
		.pipe(gulp.dest('fonts'));

	// Copy Javascript
	gulp.src(['node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'])
		.pipe(gulp.dest(appDir+'/js/vendor'));

	gulp.src(['node_modules/jquery/dist/jquery.js'])
		.pipe(gulp.dest(appDir+'/js/vendor'));

})

gulp.task('build:images', function(cb) {
    gulp.src([appDir+'/**/*.png',appDir+'/**/*.jpg',appDir+'src/**/*.gif',appDir+'src/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest(''))
    .pipe(gulp.dest(siteDir)).on('end', cb).on('error', cb);
});

// Runs Jekyll build
gulp.task('build:jekyll', function() {
  var shellCommand = 'bundle exec jekyll build --config _config.yml,_app/localhost_config.yml';
  if (config.drafts) { shellCommand += ' --drafts'; };

  return gulp.src(jekyllDir)
    .pipe(run(shellCommand))
    .on('error', gutil.log);
});

// Jekyll Watch
gulp.task('build:jekyll:watch', ['build:jekyll'], function(cb) {
  browserSync.reload();
  cb();
});
gulp.task('build:scripts:watch', ['build:scripts'], function(cb) {
  browserSync.reload();
  cb();
});

// Build Scripts
gulp.task('build:scripts', function() {
  return streamqueue({ objectMode: true },
        gulp.src(appDir+'/js/vendor/jquery.js'),
        gulp.src(appDir+'/js/vendor/bootstrap.js'),
        gulp.src(appDir+'/js/**/*.js')
    )
    .pipe(concat('site.js'))
    .pipe(uglify())
    .pipe(gulp.dest(siteDir+'/js'))
    .pipe(gulp.dest('js'))
    .on('error', gutil.log);
});

// Compile SCSS
gulp.task('build:styles', function() {
	return gulp.src(appDir+'/scss/*.scss')
		.pipe(plumber(plumberErrorHandler))
		.pipe(sourcemaps.init())
		.pipe(sass({
				includePaths: [].concat(bourbon.includePaths, neat.includePaths),
		}))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(siteDir+"/css"))
		.pipe(gulp.dest("css"))
		.pipe(browserSync.stream());
});

gulp.task('prettify', function() {

	gulp.src([appDir+"/scss/**/*.scss"])
		.pipe(prettify({
			debug: true,
			indent_level: 1,
		}))
		.pipe(gulp.dest(appDir+'/scss'));

	gulp.src([siteDir+'/*.html'])
			.pipe(prettify({
					debug: true,
					indent_level: 1,
			}))
			.pipe(gulp.dest('./'));

	gulp.src([appDir+'/js/*.js'])
		.pipe(prettify({
				debug: true,
				indent_level: 1,
		}))
		.pipe(gulp.dest(appDir+'/js'));
});

gulp.task('serve', ['build:scripts','build:styles', 'build:images', 'build:copy','build:jekyll'], function() {

  browserSync.init({
    server: siteDir,
    ghostMode: false, // do not mirror clicks, reloads, etc. (performance optimization)
    logFileChanges: true,
    port: 8080,
    open: false       // do not open the browser (annoying)
  });

  // Watch site settings
  gulp.watch(['_config.yml', '_app/localhost_config.yml'], ['build:jekyll:watch']);

  // Watch app .scss files, changes are piped to browserSync
  gulp.watch('_app/scss/**/*.scss', ['build:styles']);

  // Watch app .js files
  gulp.watch('_app/js/**/*.js', ['build:scripts:watch']);

  // Watch Jekyll posts
  gulp.watch(['_posts/**/*.+(md|markdown|MD)', '_posts/**/*.html'], ['build:jekyll:watch']);

  // Watch Jekyll drafts if --drafts flag was passed
  if (config.drafts) {
    gulp.watch('_drafts/*.+(md|markdown|MD)', ['build:jekyll:watch']);
  }

  // Watch Jekyll html files
  gulp.watch(['**/*.html', '!_site/**/*.*'], ['build:jekyll:watch']);

  // Watch Jekyll RSS feed XML file
  gulp.watch('feed.xml', ['build:jekyll:watch']);

  // Watch Jekyll data files
  gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);

  // Watch Jekyll favicon.ico
  gulp.watch('favicon.ico', ['build:jekyll:watch']);
});





