const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

let browserWin: any;

function createWindow() {
    browserWin = new BrowserWindow({
        width: 1600,
        height: 1000,
        minWidth: 900,
        minHeight: 600,
        backgroundColor: "white",
        title: "Electron App",
        icon: path.join(__dirname, "..", "..", "icon.ico"),
        frame: true,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
            enableBlinkFeatures: false,
            devTools: isDev
        }
    })

    browserWin.loadFile("index.html");
}

if (isDev) {
    require("electron-reload")(path.join(__dirname, "..", "..", ".."), {
        electron: path.join(__dirname, "..", "..", "..", "node_modules", ".bin", "electron")
    });
}

const singleInstanceLock = app.requestSingleInstanceLock();

if (!singleInstanceLock) {
    app.quit();
} else {
    app.on("second-instance", () => {
        if (browserWin) {
            if (browserWin.isMinimized()) {
                browserWin.restore();
            }
            browserWin.focus();
        }
    });

    app.whenReady().then(() => {
        createWindow();
    });
}