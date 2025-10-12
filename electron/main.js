import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import {
  setArticles,
  setGroups,
  setTaxes,
  getChecks,
  deleteGroups,
  deleteArticles,
  deleteSales,
} from "./data/index.js";
import XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  // 👇 Use this during dev
  const devServerURL =
    process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

  if (
    process.env.NODE_ENV === "development" ||
    process.env.VITE_DEV_SERVER_URL
  ) {
    win.loadURL(devServerURL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle("set-articles", async (_, ip, data) => {
    return await setArticles({ ip, data });
  });

  ipcMain.handle("set-groups", async (_, ip, data) => {
    return await setGroups({ ip, data });
  });
  ipcMain.handle("set-taxes", async (_, ip, data) => {
    return await setTaxes({ ip, data });
  });

  ipcMain.handle("get-checks", async (_, ip, params) => {
    return await getChecks({ ip, params });
  });

  ipcMain.handle("delete-groups", async (_, ip) => {
    return await deleteGroups({ ip });
  });

  ipcMain.handle("delete-articles", async (_, ip) => {
    return await deleteArticles({ ip });
  });
  ipcMain.handle("delete-sales", async (_, ip) => {
    return await deleteSales({ ip });
  });

  //
  ipcMain.handle("select-excel-file", async () => {
    console.log("🚀 ~ select-excel-file:");
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: "Select Excel File",
      properties: ["openFile"],
      filters: [{ name: "Excel Files", extensions: ["xlsx", "xls"] }],
    });
    if (canceled || filePaths.length === 0) return null;
    return filePaths[0];
  });

  ipcMain.handle("parse-excel", async (event, filePath) => {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      return { success: true, data: json };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
