const gulp = require('gulp');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
    return del('dist/**/*');
});

gulp.task('copy:css', ['clean'], function () {
    return gulp.src('css/**/*')
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('copy:js', ['clean'], function () {
    return gulp.src('js/**/*')
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/reset-css/reset.css'
    ], { base: 'bower_components' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/bower_components'))
});

gulp.task('build', [ 'clean', 'copy:css', 'copy:js', 'copy:libs']);
gulp.task('default', ['build']);