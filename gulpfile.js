var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var deporder = require('gulp-deporder');
var minify = require('gulp-minify');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');

gulp.task('css', function () {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cleanCss())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('js', function(){
    return gulp.src('./assets/scripts/**/*.js')
    .pipe(deporder())
    .pipe(concat('main.min.js'))
    .pipe(minify({
        ext:{
            src: '-Sdebug.js',
            min: '.js'
        }
    }))
    .pipe(gulp.dest('./assets/js'))
})

gulp.task('browser-sync', function () {
    browserSync.init(["./assets/css/*.css", "./assets/js/*.js", './*.html'], {
        server: {
            index: "home.html"
        }
    });
});

gulp.task('default', ['css','js', 'browser-sync'], function () {
    gulp.watch("./assets/scss/*.scss", ['css']);
    gulp.watch("./assets/scripts/**/*.js", ['js']);
    gulp.watch("./*.html").on("change", reload);
    gulp.watch("./assets/css/*.css").on("change", reload);
    gulp.watch("./assets/js/*.js").on("change", reload);
});
