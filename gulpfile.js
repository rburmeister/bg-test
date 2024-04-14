// Import necessary modules
const uswds = require("@uswds/compile");
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

// Set USWDS version
uswds.settings.version = 3;

// Define paths for source and distribution directories and file patterns
const paths = {
  src: './src',
  dist: './dist',
  html: './src/**/*.html',
  css: './src/assets/css/**/*.css',
  scss: './src/assets/uswds/dist/theme/**/*.scss',
  js: './src/assets/js/**/*.js',
  img: './src/assets/img/**/*',
  fonts: './src/assets/fonts/**/*'
};

// Specify paths for USWDS assets within the project
uswds.paths.dist.css = "./src/assets/css";
uswds.paths.dist.theme = "./src/assets/uswds/dist/theme";
uswds.paths.dist.img = './src/assets/img';
uswds.paths.dist.js = './src/assets/js';
uswds.paths.dist.fonts = './src/assets/fonts';
uswds.paths.dist.uswds = './src/assets/uswds';
uswds.paths.src.projectSass = './src/assets/css';

// Function to copy files from one location to another
function copyFiles(src, dest) {
  return function () {
    return gulp.src(src).pipe(gulp.dest(dest));
  };
}

// Create specific tasks using the generic copy function
const copyHtml = copyFiles(paths.html, paths.dist);
const copyCss = copyFiles(paths.css, `${paths.dist}/assets/css`);
const copyJs = copyFiles(paths.js, `${paths.dist}/assets/js`);
const copyImg = copyFiles(paths.img, `${paths.dist}/assets/img`);
const copyFonts = copyFiles(paths.fonts, `${paths.dist}/assets/fonts`);

// Start BrowserSync server for live reloading
function sync(done) {
  browserSync.init({
    server: {
      baseDir: paths.dist 
    },
    port: 3000
  });
  done();
}
  
// Reload the browser with BrowserSync
  function reload(done) {
    browserSync.reload();
    done();
  }
  
// Watch for file changes and trigger corresponding tasks and reloads
  function watchFiles() {
    gulp.watch(paths.scss, gulp.series(uswds.compileSass, reload));
    gulp.watch(paths.html, gulp.series(copyHtml, reload));
    gulp.watch(paths.css, gulp.series(copyCss, reload));
    gulp.watch(paths.js, gulp.series(copyJs, reload));
    gulp.watch(paths.img, gulp.series(copyImg, reload));
    gulp.watch(paths.fonts, gulp.series(copyFonts, reload));
  }
  
// Optimize images found in the root of the img folder
  function optimizeImages() {
    return gulp.src(paths.img.replace('**/*', '*.{png,jpg,jpeg}'))
      .pipe(imagemin([
        imagemin.mozjpeg({quality: 90, progressive: true}),
        imagemin.optipng({optimizationLevel: 2}),
      ]))
      .pipe(gulp.dest(`${paths.dist}/assets/img`));
  }

// Define the build sequence using series execution
const build = gulp.series(
  uswds.compile,
  optimizeImages,
  copyHtml,
  copyJs,
  copyImg,
  copyFonts,
  copyCss
);

// Define the run sequence for development including live reloading
const run = gulp.series(
  uswds.compile, 
  sync, 
  watchFiles
);

// Export tasks
exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.default = run;
exports.build = build;