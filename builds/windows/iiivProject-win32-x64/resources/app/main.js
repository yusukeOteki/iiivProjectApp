const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const fs = require("fs");

const client = require('electron-connect').client;
const loadDevtool = require('electron-load-devtool');
const debug = 0;

let win;
const info_path = path.join(__dirname, '/userData.json');

function createWindow() {
    let bounds_info;
    try {
        bounds_info = JSON.parse(fs.readFileSync(info_path, 'utf8'));
    }
    catch (e) {
        bounds_info = { width: 1200, height: 1000 };  // デフォルトバリュー
    }
    win = new BrowserWindow(bounds_info);

    win.setMenu(null);

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/client/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('close', function () {
        fs.writeFileSync(info_path, JSON.stringify(win.getBounds()));
    });

    win.on('closed', () => {
        win = null
    });

    debug && loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);
    debug && win.webContents.openDevTools();
    debug && client.create(win);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});