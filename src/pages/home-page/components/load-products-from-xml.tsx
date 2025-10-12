import { Button } from "@/components/ui/button";
import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import { useIpStore } from "@/store/ip";
import { Download, FileWarning } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { convertExcelData, validateProducts } from "./forms/utils";
import type { ProductFieldName } from "./forms/constants";
interface Errors {
  row: Record<ProductFieldName, unknown>;
  issues: {
    field: string;
    message: string;
  }[];
}
export const LoadFromXmlFile = () => {
  const { ip } = useIpStore();
  const [isLoading, startTransition] = useTransition();
  const [productErrors, setProductErrors] = useState<Errors[] | null>(null);

  const onLoadFile = async () => {
    if (!ip) return showNoIpMessage();

    setProductErrors(null);
    startTransition(async () => {
      const filePath = await window.api.selectExcelFile();
      if (!filePath) {
        toast.warning("Файл не вибрали");
        return;
      }
      const result = await window.api.parseExcel(filePath);

      console.log("🚀 ~ onLoadFile ~ result:", result);

      if (result.error) {
        toast.error("Error", { description: result.error });
        return;
      }

      const convertedData = convertExcelData(result.data);
      const { valid, errors } = validateProducts(convertedData);

      const response = await window.api.setArticles(ip, valid);

      if (response.error) {
        showIpNotRespondingMessage();
        return;
      }

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      if (errors.length > 0) {
        setProductErrors(errors);
        toast.warning(
          `Було знайдено ${errors.length} рядків з помилками. Збережіть лог-файл.`
        );
      }

      toast.success(response.data.message);

      console.log("🚀 ~ onLoadFile ~ errors:", errors);
      console.log("🚀 ~ onLoadFile ~ valid:", valid);
    });
  };

  const onSaveLogs = async () => {
    console.log("🚀 ~ onSaveLogs ~ productErrors:", productErrors);
    if (!productErrors) return;
    const response = await window.api.saveValidationErrors(productErrors);
    console.log("🚀 ~ onSaveLogs ~ response:", response);
    if (response.success) {
      toast.success(response.data);
    }
  };

  return (
    <div className="flex gap-2 flex-col">
      <Button disabled={isLoading} onClick={onLoadFile}>
        Завантажити товари з .xml
        <Download />
      </Button>
      {productErrors && (
        <Button variant="ghost" onClick={onSaveLogs}>
          Зберегти лог помилок
          <FileWarning />
        </Button>
      )}
    </div>
  );
};
