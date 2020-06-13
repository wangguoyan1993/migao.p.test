const fs = require('fs');
const path = require('path');
const { app, Menu, BrowserWindow } = require('electron');
// const cheerio = require('cheerio');

// 读取配置文件
const CONFIG = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../appconfig.json'), 'utf-8'));


/**
 * @method main
 * @description 应用主函数
 */
function main() {
    Menu.setApplicationMenu(null);

    // 使用 BrowserWindow创建窗口
    let win = new BrowserWindow({
        width: 1360,
        height: 760,
        title: 'IBatchPharma',
        
        webPreferences: {
            nodeIntegration: false
        }
    });

    win.webContents.executeJavaScript(`
        console.log('注册成功！')
    `);

    win.loadURL(CONFIG.indexUrl);
};

// app就绪时运行主函数
app.whenReady().then(main);

// 当关闭所有程序界面时，退出应用
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

// 应用开启
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        main();
    }
});
