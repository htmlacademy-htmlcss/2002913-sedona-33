import gulp from "gulp";
import browser from "browser-sync";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";

const { src, dest, watch, series } = gulp;

export function processStyles () {
  return src("./styles/style.css")
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest("./styles/"))
    .pipe(browser.stream());
}

export function startServer (done) {
  browser.init({
    server: {
      baseDir: "./"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function reloadServer (done) {
  browser.reload();
  done();
}

function watchFiles () {
  watch("./styles/style.css", series(processStyles));
  watch("./**/*.html", series(reloadServer));
}

export default series(
  processStyles,
  startServer,
  watchFiles
);
