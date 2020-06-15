const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const BABEL_CONFIG = {
    presets: [
        '@babel/env',
        '@babel/preset-typescript',
        'minify'
    ]
}

// 定义项目主目录
const ROOT_PATH = path.resolve(__dirname);

// 删除旧的编译结果
gulp.task('del_old_dist', gulp.series((callback) => {
    let old_dist = path.resolve(__dirname, './dist/');
    del.sync(old_dist);
    callback();
}));

// 主编译命令
gulp.task('build', gulp.series(['del_old_dist'], (callback) => {
    gulp.src(`${ROOT_PATH}/src/main.ts`)
        .pipe(babel(BABEL_CONFIG))
        .pipe(gulp.dest(`${ROOT_PATH}/dist/`));

    gulp.src(`${ROOT_PATH}/src/lib/*`)
        .pipe(babel(BABEL_CONFIG))
        .pipe(gulp.dest(`${ROOT_PATH}/dist/lib/`));
        
    callback();
}));