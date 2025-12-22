const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: () => console.log("pong"),
  setArticles: (ip, data) => ipcRenderer.invoke("set-articles", ip, data),
  getArticles: (ip) => ipcRenderer.invoke("get-articles", ip),

  deleteArticles: (ip) => ipcRenderer.invoke("delete-articles", ip),
  saveValidationErrors: (errors) =>
    ipcRenderer.invoke("save-validation-errors", errors),

  //
  setGroups: (ip, data) => ipcRenderer.invoke("set-groups", ip, data),
  deleteGroups: (ip) => ipcRenderer.invoke("delete-groups", ip),
  //
  setTaxes: (ip, data) => ipcRenderer.invoke("set-taxes", ip, data),
  //

  getChecks: (ip, params) => ipcRenderer.invoke("get-checks", ip, params),
  deleteSales: (ip) => ipcRenderer.invoke("delete-sales", ip),
  //
  selectExcelFile: () => ipcRenderer.invoke("select-excel-file"),
  parseExcel: (filePath) => ipcRenderer.invoke("parse-excel", filePath),
  generateExampleProducts: () =>
    ipcRenderer.invoke("generate-example-products"),
  generateExampleTaxes: () => ipcRenderer.invoke("generate-example-taxes"),
  generateExampleGroups: () => ipcRenderer.invoke("generate-example-groups"),
  downloadExcel: (data, name, label) =>
    ipcRenderer.invoke("download-excel", data, name, label),
  checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
  installUpdate: () => ipcRenderer.invoke("install-update"),
});
