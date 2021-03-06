/**
 * Created by lonelydawn on 2017-03-02.
 */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var Karma = require('karma').Server;
var watch = require('gulp-watch');

var path={
    doorJs:     ['./app/javascripts-door/**/*.js'],
    misJs:     ['./app/javascripts-mis/**/**/*.js'],
    css:    ['./app/css/*.css'],
    test:   ['./test/*.js']
};


/**
 * gulp 函数使用说明
 * task 定义任务    如果想在命令行执行任务, 命名不可使用空格
 * src  获取资源
 * dest 注入资源
 */
// 合并门户网 js
gulp.task('doorJs:merge',function(){
   return gulp.src(path.doorJs)
       .pipe(plumber())
       .pipe(ngAnnotate())
       .pipe(concat('app-door.js'))
       .pipe(babel())
       .pipe(gulp.dest('./public/javascripts'));
});

// 压缩门户网 js
gulp.task('doorJs:minify',function(){
    return gulp.src(path.doorJs)
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(concat('app-door.min.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
});

// 合并管理系统 js
gulp.task('misJs:merge',function(){
    return gulp.src(path.misJs)
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(concat('app-mis.js'))
        .pipe(babel())
        .pipe(gulp.dest('./public/javascripts'));
});

// 压缩管理系统 js
gulp.task('misJs:minify',function(){
    return gulp.src(path.misJs)
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(concat('app-mis.min.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
});

// 合并css
gulp.task('css:merge',function(){
    return gulp.src(path.css)
        .pipe(plumber())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/stylesheets'));
});

// 压缩管理系统 css
gulp.task('css:minify',function(){
    return gulp.src(path.css)
        .pipe(plumber())
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./public/stylesheets'));
});

// 前端自动化测试
gulp.task('test', function (done) {
    new Karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('tdd', function (done) {
    new Karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

// 监测文件变化, 执行响应动作
gulp.task('watch',function(){
    // 检测门户网js
    gulp.watch(path.doorJs,['doorJs:merge','doorJs:minify']);
    // 检测管理系统js
    gulp.watch(path.misJs,['misJs:merge','misJs:minify']);
    // 检测css
    gulp.watch(path.css,['css:merge','css:minify']);

    gulp.watch(path.test,['test']);
});

// 默认执行任务
gulp.task('default',function(){
   gulp.start(['doorJs:merge','doorJs:minify','misJs:merge','misJs:minify',
       'css:merge','css:minify']);
   // gulp.start(['watch']);
});