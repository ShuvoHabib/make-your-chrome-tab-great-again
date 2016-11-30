var gulp = require('gulp');
var purify = require('gulp-purifycss');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', function () {
    return gulp.src('css/*.css')
        .pipe(purify(['./js/*.js', './*.html']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./out'));
})