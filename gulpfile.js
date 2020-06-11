const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');

// 定义项目主目录
const ROOT_PATH = path.resolve(__dirname);


gulp.task('build', gulp.series((callback) => {
    gulp.src(`${ROOT_PATH}/src/main.ts`)
        .pipe(babel())
        .pipe(gulp.dest(`${ROOT_PATH}/dist/`));
    callback();
}));