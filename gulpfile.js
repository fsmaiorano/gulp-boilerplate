var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SASS_PATH = 'public/scss/**/*.scss';

//------------------- Styles --------------------
// PURE CSS
// gulp.task('styles', function () {
//     console.log('---> [starting styles task]');
//     return gulp.src(['public/css/reset.css', CSS_PATH])
//         .pipe(plumber(function (err) {
//             console.log("style task error");
//             console.log(err);
//             this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions']
//         }))
//         .pipe(concat('styles.css'))
//         .pipe(minifyCss())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH))
//         .pipe(livereload());
// });

// SASS
gulp.task('styles', function () {
    console.log('---> [starting styles task]');
    return gulp.src('public/scss/styles.scss')
        .pipe(plumber(function (err) {
            console.log("style task error");
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

//------------------- Scripts -------------------
gulp.task('scripts', function (cb) {
    console.log('---> [starting scripts task]');
    return gulp.src(SCRIPTS_PATH)
        .pipe(plumber(function (err) {
            console.log("scripts task error");
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        // .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

//------------------- Images --------------------
gulp.task('images', function () {
    console.log('---> [starting images task]');
});

//------------------- Start ---------------------
gulp.task('watch', function () {
    console.log('---> [starting watch task]');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    // gulp.watch(CSS_PATH, ['styles']);
    gulp.watch(SASS_PATH, ['styles']);
});

gulp.task('default', ['images', 'styles', 'scripts'], function () {
    console.log('---> [starting default task]');
});