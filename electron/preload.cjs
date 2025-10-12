const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: () => console.log("pong"),
  setArticles: (ip, data) => ipcRenderer.invoke("set-articles", ip, data),
  deleteArticles: (ip) => ipcRenderer.invoke("delete-articles", ip),
  saveValidationErrors: (errors) =>
    ipcRenderer.invoke("save-validation-errors", errors),
  setTaxes: (ip, data) => ipcRenderer.invoke("set-taxes", ip, data),
  selectExcelFile: () => ipcRenderer.invoke("select-excel-file"),
  parseExcel: (filePath) => ipcRenderer.invoke("parse-excel", filePath),
});
// const { contextBridge } = require("electron");
// const { electronAPI } = require("@electron-toolkit/preload");

// // Custom APIs for renderer
// const api = {};

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld("electron", electronAPI);
//     contextBridge.exposeInMainWorld("api", api);
//   } catch (error) {
//     console.error(error);
//   }
// } else {
//   // @ts-ignore (define in dts)
//   window.electron = electronAPI;
//   // @ts-ignore (define in dts)
//   window.api = api;
// }
