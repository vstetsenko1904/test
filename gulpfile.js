const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace')

gulp.task('sass', function(done) {
    gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('pug', function(done) {
    gulp.src('src/pug/**/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('svg', function(done) {
    gulp.src('src/images/svg-icons/*.svg')
    // minify svg
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    // remove all fill and style declarations in out shapes
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
    }))
    // cheerio plugin create unnecessary string '>', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg",
            }
        }
    }))
    .pipe(gulp.dest('dist/images/svg/'));
});

gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('src/pug/**/*.pug',gulp.series('pug'));
});