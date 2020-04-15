
const gulp                = require('gulp')
const sass                = require('gulp-sass')
sass.compiler         = require('node-sass')
const SourceMap      =  require('gulp-sourcemaps')
const autoPrefix    = require('gulp-autoprefixer')
const minify            = require('gulp-clean-css')
const rename            = require('gulp-rename')
const uglify            = require('gulp-uglify')
const browserSync  = require('browser-sync').create() 

// File Paths
const StyleSrc          = './sass/**/*.scss'
const StyleDest        = './css/'
const cssSrc              = './css/*.css'
const cssDest            =  './css/dist/'
const scriptSrc        = './js/*.js'
const ScriptDest      = './js/dist/'

// Sass Compilation
function style () {
  return gulp.src(StyleSrc)
  .pipe(SourceMap.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoPrefix())
  .pipe(SourceMap.write('./'))
  .pipe(gulp.dest(StyleDest))
  .pipe(browserSync.stream())
}

// Css Compression
function cssMinify () {
  return gulp.src(cssSrc)
  .pipe(SourceMap.init())
  .pipe(minify())
  .pipe(rename({extname: '.min.css'}))
  .pipe(SourceMap.write('./'))
  .pipe(gulp.dest(cssDest))
  .pipe(browserSync.stream())
}

// Javascript Compression
function script () {
  return gulp.src(scriptSrc)
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest(ScriptDest))
  .pipe(browserSync.stream())
}

// Watch Css File
function watch () {
  browserSync.init ({
    server: {
      baseDir: './'
    }
  }) 
  gulp.watch(StyleSrc, style)
  gulp.watch(cssSrc, cssMinify)
  gulp.watch(scriptSrc, script)
  gulp.watch('./*.html').on('change',browserSync.reload)
}


gulp.task('style', style)
gulp.task('cssMinify', cssMinify)
gulp.task('script', script)
gulp.task('watch', watch)
gulp.task('default', watch)
