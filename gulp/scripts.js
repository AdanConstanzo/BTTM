var gulp   = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var sourcemaps = require('gulp-sourcemaps')
var livereload = require('gulp-livereload');

gulp.task('js', function () {
    return gulp.src(['ng/module.js', 'ng/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'))
        .pipe(livereload())
})

gulp.task('watch:js', ['js'], function () {
	livereload.listen();
    gulp.watch('ng/**/*.js', ['js'])
})