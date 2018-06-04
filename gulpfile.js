var gulp = require('gulp');
var pump = require('pump');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

gulp.task('iconfont', function(){
  gulp.src(['icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'icon_font',
      targetPath: '../css/icons.css',
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
  gulp.watch('icons/**/*.svg', ['iconfont']);
});

gulp.task('default', ['watch']);
