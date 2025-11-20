import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import { deleteAsync } from 'del';
import  * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import webp from 'gulp-webp';
import newer from "gulp-newer";

const sass = gulpSass(dartSass);
const bs = browserSync.create();

const paths = {
  html: {
    src: 'src/pages/**/*.html',
    dest: 'dist/',
    watch: ['src/pages/**/*.html', 'src/components/**/*.html'],
  },
  styles: {
    src: 'src/scss/main.scss',
    dest: 'dist/assets/css/',
    watch: 'src/scss/**/*.scss',
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets/',
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/assets/fonts/',
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/assets/images',
  },
  js: {
        src: 'src/assets/js/**/*.js',
        dest: 'dist/assets/js/',
        watch: 'src/assets/js/**/*.js',
  }
};
export const html = () =>
  gulp
    .src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: '@@',

        basepath: 'src/components/',
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: false,
        removeComments: true,
      })
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(bs.stream());

export const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());

export const copyJs = () =>
    gulp.src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
        .pipe(bs.stream());

const imagesToWebp = () =>
  gulp.src(paths.images.src, { encoding: false })
    .pipe(newer(paths.images.dest))
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest(paths.images.dest))

const copyImages = () =>
    gulp.src(paths.images.src) 
        .pipe(newer(paths.images.dest))
        .pipe(gulp.dest(paths.images.dest));

export const assets = () =>
  gulp.src(paths.assets.src).pipe(gulp.dest(paths.assets.dest));

export const fonts = () =>
  gulp.src(paths.fonts.src,{encoding: false}).pipe(gulp.dest(paths.fonts.dest));

// Очистка
export const clean = () => deleteAsync(['dist']);

// Сервер
export const serve = () => {
  bs.init({
    server: {
      baseDir: './dist',
    },
    notify: false,
    open: true,
    cors: true,
  });

  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.html.watch, html);
  gulp.watch(paths.assets.src, assets);
  gulp.watch(paths.fonts.src, fonts);
  gulp.watch(paths.images.src, imagesToWebp);
  gulp.watch(paths.images.src, copyImages);
  gulp.watch(paths.js.watch, copyJs);
};

// Сборка
export const build = gulp.series(clean, gulp.parallel(styles, html, assets, fonts, imagesToWebp, copyImages, copyJs));
export default gulp.series(build, serve);
