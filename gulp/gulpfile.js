var gulp = require('gulp');
var del = require('del');  // 删除
var rev = require('gulp-rev'); // 添加版本号
var revCollector = require('gulp-rev-collector'); // 替换版本号
var clone = require('gulp-clone'); // 克隆
var runSequence = require('run-sequence'); //处理异步

var less = require('gulp-less'); // less转css
var cleanCss = require('gulp-clean-css'); // 压缩css

var babel = require('gulp-babel'); // es5转es6
var uglify = require('gulp-uglify'); // 压缩js

var imagemin = require('gulp-imagemin'); // 压缩图片
var base64 = require('gulp-base64'); // 小图片处理成base64

var htmlmin = require('gulp-htmlmin'); // 压缩html


//var makeUrlVer = require('gulp-make-css-url-version'); //给图片加hash值
// var concat = require('gulp-concat'); 合并文件
// var rename = require('gulp-rename'); 修改文件名


/************************主要配置*****************************/
var options = {
    removeComments: true, // 清除HTML注释
    collapseWhitespace: true, // 压缩HTML
    collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
    minifyJS: true, // 压缩页面JS
    minifyCSS: true // 压缩页面CSS
};
var config = {
    src:'./src/',
    build:'./build/'
};
gulp.task('del',function(){
	del([
		'./build/'
	])
});

gulp.task('delCss',function(){
	del([
		'./build/css/**.*'
	])
});

gulp.task('delJs',function(){
	del([
		'./build/js/**.*'
	])
});

gulp.task('images', function(){
	return gulp.src('./src/images/*.*')
	.pipe(imagemin())
    .pipe(rev())
	.pipe(gulp.dest('./build/images/'))
    .pipe( rev.manifest() )
    .pipe(gulp.dest('./build/images/'))
});

gulp.task('less', function(){
   return  gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css/'))
});

gulp.task('css', function(){
   return  gulp.src('./src/css/*.css')
    .pipe(base64({baseDir: './src',maxImageSize: 8*1024})) 
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(gulp.dest('./build/css/'))
    .pipe( rev.manifest() )
    .pipe(gulp.dest('./build/css/'))
});
gulp.task('imgCss', function () {
    return gulp.src(['./build/images/*.json', './build/css/*.css'])
        .pipe(revCollector())
        .pipe(gulp.dest('./build/css/'));
});
gulp.task('js', function(){
	return gulp.src('./src/js/*.js')
	.pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./build/js/'))
    .pipe( rev.manifest() )
    .pipe(gulp.dest('./build/js/'))
});
gulp.task('imgJs', function () {
    return gulp.src(['./build/images/*.json', './build/js/*.js'])
        .pipe(revCollector())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('rev', function () {
    gulp.src(['./build/**/*.json', './src/*.html','./src/*.php'])
        .pipe( revCollector({
            replaceReved: true
         }))
        .pipe(htmlmin(options))
        .pipe( gulp.dest('./build') );
});

gulp.task('clone',function(){
	gulp.src(['./src/lib/*.*' , './src/inc/*.*'])
		.pipe(clone())
		.pipe(gulp.dest('./build/lib/'))
});

gulp.task('default', function(callback){
    runSequence(
        'delCss',
        'delJs',
        'clone',
        'images',
        'less',
        'css',
        'imgCss',
        'js',
        'imgJs',
        'other',
        'rev',
        callback);
});


/************************特殊处理*****************************/
var otherUrl={
    src: './src/zhuanti/',
    build: './build/zhuanti/'
};
gulp.task('delOther',function(){
	return del([otherUrl.build])
});
gulp.task('otherImages', function(){
	return gulp.src(otherUrl.src+'images/*.*')
	.pipe(imagemin())
    .pipe(rev())
	.pipe(gulp.dest(otherUrl.build+'images/'))
    .pipe( rev.manifest() )
    .pipe(gulp.dest(otherUrl.build+'images/'))
});
gulp.task('otherCss', function(){
   return  gulp.src(otherUrl.src+'css/*.css')
    .pipe(base64({baseDir: './src',maxImageSize: 8*1024})) 
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(gulp.dest(otherUrl.build+'css/'))
    .pipe( rev.manifest() )
    .pipe(gulp.dest(otherUrl.build+'css/'))
});
gulp.task('otherImgCss', function () {
    return gulp.src([otherUrl.build+'images/*.json', otherUrl.build+'css/*.css'])
        .pipe(revCollector())
        .pipe(gulp.dest(otherUrl.build+'css/'));
});
gulp.task('otherJs', function(){
	return gulp.src(otherUrl.src+'js/*.js')
	.pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(otherUrl.build+'js/'))
    .pipe( rev.manifest() )
    .pipe(gulp.dest(otherUrl.build+'js/'))
});
gulp.task('otherImgJs', function () {
    return gulp.src([otherUrl.build+'images/*.json', otherUrl.build+'js/*.js'])
        .pipe(revCollector())
        .pipe(gulp.dest(otherUrl.build+'js/'));
});

gulp.task('otherHtml', function () {
    gulp.src(['./build/**/*.json', otherUrl.src+'**.*'])
        .pipe( revCollector({
            replaceReved: true
        }) )
        .pipe(htmlmin(options))
        .pipe( gulp.dest(otherUrl.build) );
});

gulp.task('other', function(callback){
    runSequence(
        'delOther',
        'otherImages',
        'otherCss',
        'otherImgCss',
        'otherJs',
        'otherImgJs',
        'otherHtml',
        callback);
});









