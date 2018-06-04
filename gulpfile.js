var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task('sass', function(){
  return gulp
    .src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('css/'))
});

gulp.task('compress', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename('site.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('iconfont', function(){
  gulp.src(['src/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'icon_font',
      targetPath: '../src/sass/_icons.css',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: 'icon_font',
      normalize:true,
      fontHeight: 1001
     }))
    .pipe(gulp.dest('fonts/'));
});


gulp.task('watch', function(){
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['compress']);
  gulp.watch('src/icons/**/*.svg', ['iconfont','sass']);
});

gulp.task('default', ['sass', 'compress', 'watch']);
