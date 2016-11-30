var gulp = require('gulp');
var purify = require('gulp-purifycss');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', function () {
    return gulp.src('css/*.css')
        .pipe(purify(['./js/*.js', './*.html']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./out'));
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('js/*.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});