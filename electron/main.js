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
  deleteProducts,
} from "./data/index.js";
import XLSX from "xlsx";
import { saveArticlesLog } from "./lib/index.js";
import { exampleData, exampleGroups, exampleTaxes } from "./constants/index.js";
import "./lib/quit.cjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
    icon: path.join(__dirname, "build/logo.icns"),
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

  ipcMain.handle("get-articles", async (_, ip) => {
    return await deleteProducts({ ip });
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

  ipcMain.handle("save-validation-errors", (_event, errors) => {
    return saveArticlesLog(errors);
  });

  ipcMain.handle("generate-example-products", async () => {
    try {
      // create worksheet from JS object
      const worksheet = XLSX.utils.json_to_sheet(exampleData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Товари");

      // ask user where to save
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Зберегти приклад Excel-файлу",
        defaultPath: "example_products.xlsx",
        filters: [{ name: "Excel Files", extensions: ["xlsx"] }],
      });

      if (canceled || !filePath)
        return { success: false, message: "Відмінено" };

      // write file
      XLSX.writeFile(workbook, filePath);

      return { success: true, message: "Файл прикладу збережено успішно" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  });

  // --- New handler for taxes ---
  ipcMain.handle("generate-example-taxes", async () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(exampleTaxes);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Податки");

      const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Зберегти приклад Excel-файлу податків",
        defaultPath: "example_taxes.xlsx",
        filters: [{ name: "Excel Files", extensions: ["xlsx"] }],
      });

      if (canceled || !filePath)
        return { success: false, message: "Відмінено" };

      XLSX.writeFile(workbook, filePath);
      return {
        success: true,
        message: "Файл прикладу податків збережено успішно",
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  });

  // --- New handler for groups ---
  ipcMain.handle("generate-example-groups", async () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(exampleGroups);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Групи");

      const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Зберегти приклад Excel-файлу груп",
        defaultPath: "example_groups.xlsx",
        filters: [{ name: "Excel Files", extensions: ["xlsx"] }],
      });

      if (canceled || !filePath)
        return { success: false, message: "Відмінено" };

      XLSX.writeFile(workbook, filePath);
      return { success: true, message: "Файл прикладу груп збережено успішно" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("download-excel", async (_event, data, name, label) => {
  try {
    // create worksheet from JS object
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, label);

    // ask user where to save
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Зберегти " + label,
      defaultPath: `${name}.xlsx`,
      filters: [{ name: "Excel Files", extensions: ["xlsx"] }],
    });

    if (canceled || !filePath) return { success: false, message: "Відмінено" };

    // write file
    XLSX.writeFile(workbook, filePath);

    return { success: true, message: "Файл збережено успішно" };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
