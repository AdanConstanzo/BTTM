var gulp   = require('gulp')
var stylus = require('gulp-stylus')
var concatCss = require('gulp-concat-css')
var uglifycss = require('gulp-uglifycss');
var sourcemaps = require('gulp-sourcemaps')

gulp.task('css', function () {
    return gulp.src('css/**/*.css')
    	.pipe(sourcemaps.init())
        .pipe(stylus())
    	.pipe(concatCss("app.css"))
        .pipe(uglifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'))
})

gulp.task('watch:css', ['css'], function () {
    gulp.watch('css/**/*.css', ['css'])
})