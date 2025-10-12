import { dialog } from "electron";
import fs from "fs";

import { nameToLabelMap } from "../constants/index.js";

export const saveArticlesLog = async (errors) => {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Зберегти лог помилок",
      defaultPath: `validation-errors-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.log`,
      filters: [{ name: "Log Files", extensions: ["log", "txt"] }],
    });

    if (canceled || !filePath)
      return { success: false, error: "Відмінено користувачем" };

    const content = errors
      .map(
        (e, i) => `
    # Рядок ${i}
    ${JSON.stringify(e.row, null, 2)}
    
    ## Помилки:
    ${e.issues
      .map((iss) => `- [${nameToLabelMap[iss.field]}] ${iss.message}`)
      .join("\n")}
    `
      )
      .join("\n\n");

    fs.writeFileSync(filePath, content.trim(), "utf-8");
    return { success: true, data: `Завантажено: ${filePath}` };
  } catch (e) {
    console.log("🚀 ~ saveArticlesLog ~ e:", e);
    return { success: false, error: true };
  }
};
