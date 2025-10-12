const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: () => console.log("pong"),
  setArticles: (ip, data) => ipcRenderer.invoke("set-articles", ip, data),
  deleteArticles: (ip) => ipcRenderer.invoke("delete-articles", ip),
  saveValidationErrors: (errors) =>
    ipcRenderer.invoke("save-validation-errors", errors),

  //
  setGroups: (ip, data) => ipcRenderer.invoke("set-groups", ip, data),
  //
  setTaxes: (ip, data) => ipcRenderer.invoke("set-taxes", ip, data),
  selectExcelFile: () => ipcRenderer.invoke("select-excel-file"),
  parseExcel: (filePath) => ipcRenderer.invoke("parse-excel", filePath),
});
