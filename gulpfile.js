var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var clean = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

// //////////////////////////////////////////////
// Sass to css
// /////////////////////////////////////////////
gulp.task('sass', function () {
    return gulp.src('sass/styles.sass')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});


// ///////////////////////////////////////////////////
// DIST FOLDER
// //////////////////////////////////////////////////

var filesToMove = [
    './bower_components/**/*.*',
    './css/styles.css',
    './images/**/*.*',
    './js/**/*.*',
    './readme.md'
];

// Clean up dist folder
gulp.task('clean', function () {
    return gulp.src(['dist/*'], {read: false})
        .pipe(clean());
});

// Create dist folder
gulp.task('dist', ['clean'], function () {
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src(filesToMove, {base: './'})
        .pipe(gulp.dest('dist'));
});

// /////////////////////////////////////////////////
// MINIFY IMAGES
// ////////////////////////////////////////////////

gulp.task('compress-images', function(){
    return gulp.src('images/**')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('dist/images/'));
});

// ///////////////////////////////////////////////////
// Watch Task
// ///////////////////////////////////////////////////
gulp.task('watch', function () {
    gulp.watch('sass/**/*.{scss,sass}', ['sass']);
});

// ///////////////////////////////////////////////////
// Default Task
// ///////////////////////////////////////////////////
gulp.task('default', ['sass', 'watch']);