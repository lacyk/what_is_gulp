let gulp     = require('gulp'),
browserSync  = require('browser-sync').create(),
sass         = require('gulp-sass'),
prefixer     = require('gulp-autoprefixer'),
cssmin       = require('gulp-clean-css'),
uglify       = require('gulp-uglify'),
fileinclude  = require('gulp-file-include'),
gcmq         = require('gulp-group-css-media-queries');

gulp.task('html_build', function (done) {
    return gulp.src('src/*.html')
        .pipe(fileinclude())
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('css_build', function (done) {
    return gulp.src('src/assets/style/style.scss')
        .pipe(sass())
        .pipe(prefixer())
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('js_build', function (done) {
    return gulp.src('src/assets/js/script.js')
        .pipe(fileinclude())
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('fonts_build', function (done) {
    gulp.src('src/assets/fonts/*.*')
        .pipe(gulp.dest('build/fonts/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('webServer', function(done) {
    browserSync.init({
        server: "build/"
    });
    gulp.watch('src/**/*.html', gulp.series('html_build'));
    gulp.watch('src/**/*.scss', gulp.series('css_build'));
    gulp.watch('src/**/*.js', gulp.series('js_build'));
    gulp.watch('src/assets/fonts/*.*', gulp.series('fonts_build'));
    done();
});

gulp.task('default', gulp.series('html_build', 'css_build', 'js_build', 'fonts_build', 'webServer'));
