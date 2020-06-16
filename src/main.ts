const fs = require('fs');
const path = require('path');
const { app, Menu, BrowserWindow } = require('electron');
const exec = require('child_process').exec;
// import { JSEvent } from './lib/index';
// const JSInterface = new JSEvent();
// const cheerio = require('cheerio');

// 读取配置文件
const CONFIG = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../appconfig.json'), 'utf-8'));

let localServer: any;


/**
 * @method main
 * @description 应用主函数
 */
function main() {
    // Menu.setApplicationMenu(null);

    // 使用 BrowserWindow创建窗口
    let win = new BrowserWindow({
        width: 1360,
        height: 760,
        title: 'IBatchPharma',

        webPreferences: {
            nodeIntegration: false
        }
    });

    const localServerScriptPath = path.resolve(__dirname, './subprocess/local-server');

    localServer = exec(`node ${localServerScriptPath}`, (err, stdout, stderr) => {
        if (err) {
            console.log(err.stack);
            console.log(`-- 本地服务启动异常： ${err.co}`);
            return;
        }
        console.log(`-- 输出： ${stdout}`);
        console.log(process.pid);
    });

    // 注册 api
    // 重命名 Electron 提供的 require，确保jquery等框架可用
    // win.webContents.executeJavaScript(`
    //     if(document.readyState === "complete"){
    //         let basePath = process.cwd();
    //         window.JSEvent = require(basePath + '//dist//lib//index.js');
    //         console.info('--executeJavaScript export Object --> ', window.JSEvent);
    //     }
    // `);

    win.loadURL(CONFIG.indexUrl);
};

// app就绪时运行主函数
app.whenReady().then(main);

// 当关闭所有程序界面时，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();

        if (!localServer) {
            // console.log('openExec is null')
        } else {
            exec('taskkill /f /t /im node.exe', function (error, stdout, stderr) {
                if (error) {
                    console.log(error.stack);
                    console.log('Error code: ' + error.code);
                    return;
                }
                console.log('使用exec方法输出: ' + stdout);
                console.log(`stderr: ${stderr}`);
            });
        }
    }
});

// 应用开启
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        main();
    }
});
