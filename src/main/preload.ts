const { ipcRenderer, contextBridge } = require("electron");

const API = {
    //Write functions to communicate between renderer process and main process
}

contextBridge.exposeInMainWorld("electron", API);