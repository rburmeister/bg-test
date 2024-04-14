/* gulpfile.js */

const uswds = require("@uswds/compile");
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// new 
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const del = require('del');

/**
 * USWDS version
 */

uswds.settings.version = 3;

const paths = {
    html: {
      src: '.src/**/*.html', // Adjust if necessary
    },
    scss: {
      src: './src/assets/uswds/dist/theme/**/*.scss', // Adjust if necessary
    },
    css: {
        src: './src/assets/css/**/*.css', // Adjust if necessary
      },
    images: {
      src: './src/assets/images/**/*', // Adjust if necessary
    },
  };

/**
 * Path settings
 * Set as many as you need
 */

uswds.paths.dist.css = "./src/assets/css";
uswds.paths.dist.theme = "./src/assets/uswds/dist/theme";
uswds.paths.dist.img = './src/assets/img';
uswds.paths.dist.js = './src/assets/js';
uswds.paths.dist.fonts = './src/assets/fonts';
uswds.paths.dist.uswds = './src/assets/uswds';


// BrowserSync task to start the server
function sync(done) {
    browserSync.init({
      server: {
        baseDir: './src/'
      },
      port: 3000 // Optional: You can specify a different port
    });
    done();
  }
  
  // BrowserSync reload
  function reload(done) {
    browserSync.reload();
    done();
  }
  
  // Watch files with BrowserSync
  function watchFiles() {
    gulp.watch(paths.scss.src, gulp.series(uswds.compileSass));
    gulp.watch(paths.css.src, reload);
    gulp.watch(paths.images.src, gulp.series(exports.copyImages, reload));
    gulp.watch(paths.html.src, reload);
  }

  // Watch SCSS files for changes, compile them with USWDS, and reload browser

/**
 * Exports
 * Add as many as you need
 */

exports.init = uswds.init;
exports.compile = uswds.compile;
exports.compile = uswds.updateUswds;
exports.copyImages = uswds.copyImages;
exports.copyJS = uswds.copyJS;
exports.default = gulp.series(sync, watchFiles);
