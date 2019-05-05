//this is gulpfile.this.js
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
// var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var stripDebug = require('gulp-strip-debug');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
// var babel = require('gulp-babel');
var scss = require('gulp-sass');

var path = {
    src: {
        root: 'src/',
        scss: 'src/sass/',
        js: 'src/js',
        img: 'src/img'
    },
    dist: {
        root : 'dist/',
        css: 'dist/css/',
        js: 'dist/js',
        img: 'dist/img'
    }
};

var config = {
    pathRoot : path.dist.root,
    port : 3001
};

var scssOptions = {
    /** * outputStyle (Type : String , Default : nested) * CSS의 컴파일 결과 코드스타일 지정 * Values : nested, expanded, compact, compressed */
    outputStyle : 'expanded',
    /** * indentType (>= v3.0.0 , Type : String , Default : space) * 컴파일 된 CSS의 "들여쓰기" 의 타입 * Values : space , tab */
    indentType : "tab",
    /** * indentWidth (>= v3.0.0, Type : Integer , Default : 2) * 컴파일 된 CSS의 "들여쓰기" 의 갯수 */
    indentWidth : 1,
    /** * precision (Type : Integer , Default : 5) * 컴파일 된 CSS 의 소수점 자리수. */
    precision: 6,
    /** * sourceComments (Type : Boolean , Default : false) * 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시. */
    sourceComments: true
};

gulp.task('copy-html', function(){
    // index.html 복사
    gulp.src([path.src.root + '**/*.html'])
        .pipe(gulp.dest(path.dist.root))
        .pipe(browserSync.stream());
});

gulp.task('build-sass', function () {
    console.log('build sass...');
    return gulp.src([path.src.scss + '**/*.scss'])
        // 소스맵 초기화
        .pipe(sourcemaps.init())
        // scss 함수에 옵션값을 설정, scss 작성시 watch가 멈추지 않도록 logError를 설정
        .pipe(scss(scssOptions).on('error', scss.logError))
        // .pipe(rename(''))
        // 소스맵 사용
        .pipe(sourcemaps.write())
        // 코드 난독화
        // .pipe(uglify())
        // dest 설정
        .pipe(gulp.dest(path.dist.root + 'css/'))
        .pipe(browserSync.stream());
});

gulp.task('build-js', function () {
    console.log('build_js...');
    return gulp.src([path.src.js + '**/*.js'])
        // stripDebug : 모든 console.log, alert 제거
        // .pipe(stripDebug())
        .pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['es2015','react']
        // }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.root))
        .pipe(browserSync.stream());
});


// copy images
gulp.task('copy-img', function(){
    gulp.src([path.src.img + 'img/**/*'])
        .pipe(gulp.dest(path.dist + 'img'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function () {
    console.log('clean ...')
});

gulp.task('serve', function () {
    console.log('serve ...');
    browserSync.init({
        browser: ["chrome"],
        server: {
            baseDir: path.dist.root
        },
        port: config.port,
        index : "index.html"
    });

});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
    gulp.watch(path.src.root + '**/*.scss', gulp.parallel('build-sass')).on('change', browserSync.reload);
    gulp.watch(path.src.root + '**/*.js', gulp.parallel('build-js')).on('change', browserSync.reload);
    gulp.watch(path.src.root + '**/*.html', gulp.parallel('copy-html')).on('change', browserSync.reload);
    // gulp.watch(path.src.root + 'img/**/*', ['copy-img']).on('change', browserSync.reload);
    // gulp.watch(path.src + '*.html', gulp.parallel('copy-html')).on('change', browserSync.reload)
});

gulp.task('build',gulp.parallel('copy-html', 'build-js', 'build-sass', 'copy-img'), function(){
    console.log('build...');
});

gulp.task('default', gulp.parallel('clean', 'build', 'serve', 'watch'), function () {
    console.log('시작');
    console.log('default [clean -> build_development -> serve -> watch]');
});

gulp.task('test', function () {
    console.log('시작');
});