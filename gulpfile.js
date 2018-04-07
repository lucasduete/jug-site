const gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify-es').default,
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

gulp.task('default', ['copy'], () => {
    gulp.start('usemin');
});

gulp.task('copy', ['clean'], () => {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('clean-specify', () => {
    return gulp.src(['dist/app/', 'dist/assets/css', 'dist/assets/js', 'dist/assets/components'])
        .pipe(clean());
});

gulp.task('usemin', ['clean-specify'], () => {
    gulp.src('src/index.html')
        .pipe(usemin({
            'js': [uglify],
            'css': [autoprefixer, cssmin]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
});