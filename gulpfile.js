var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	htmlreplace = require('gulp-html-replace'),
	copy = require('gulp-copy'),
	webserver = require('gulp-webserver'),
	del = require('del'),
	ghPages = require('gulp-gh-pages');

gulp.task('default', ['del', 'minify-js', 'minify-css', 'imagemin', 'html-replace', 'copy-icon']);

gulp.task('dev', function () {
	gulp.start('webserver');
});

gulp.task('deploy', ['default'], function() {
	return gulp.src('./dist/**/*')
		.pipe(ghPages({remoteUrl: 'https://github.com/sailormansam/sailormansam.git', branch: 'deploy'}));
});

gulp.task('del', function (cb) {
	del(['dist/**', '!dist'], cb);
});

gulp.task('html-replace', ['del'], function () {
	return gulp.src('index.html')
		.pipe(htmlreplace({ js: 'js/main.min.js', css: 'css/main.min.css' }))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-js', ['del'], function () {
	return gulp.src('js/**/*')
		.pipe(concat('main.js'))
		.pipe(uglify({ mangle: false }))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', ['del'], function () {
	return gulp.src('css/*.css')
		.pipe(concat('main.css'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', ['del'], function () {
	return gulp.src('images/*')
		.pipe(imagemin({progressive: true}))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('copy-icon', ['del'], function () {
	return gulp.src('favicon.ico')
		.pipe(copy('dist', { prefix: 1 }));
});

gulp.task('webserver', function() {
	gulp.src('/')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});
