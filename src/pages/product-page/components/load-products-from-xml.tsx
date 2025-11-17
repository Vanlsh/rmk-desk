import { Button } from "@/components/ui/button";
import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import type { ProductFieldName } from "@/pages/utils/constants";
import { convertExcelData, validateProducts } from "@/pages/utils/utils";
import { useIpStore } from "@/store/ip";
import { Download, FileWarning } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

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
      console.log("🚀 ~ onLoadFile ~ response:", errors);
      if (errors.length > 0) {
        setProductErrors(errors);
        toast.warning(
          `Було знайдено ${errors.length} рядків з помилками. Збережіть лог-файл.`
        );
      }

      if (response.error) {
        showIpNotRespondingMessage();
        return;
      }

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      toast.success(response.data.message);
    });
  };

  const onSaveLogs = async () => {
    if (!productErrors) return;
    const response = await window.api.saveValidationErrors(productErrors);
    if (response.success) {
      toast.success(response.data);
    }
  };

  const loadTestFile = async () => {
    const result = await window.api.generateExampleProducts();
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };

  return (
    <div className=" flex gap-2 ">
      <div className="flex gap-2 ">
        <Button disabled={isLoading} onClick={onLoadFile}>
          Завантажити товари з .xls
          <Download />
        </Button>
        {productErrors && (
          <Button variant="ghost" onClick={onSaveLogs}>
            Зберегти лог помилок
            <FileWarning />
          </Button>
        )}
      </div>
      <Button variant="outline" onClick={loadTestFile}>
        Завантажити приклад .xls файлу
      </Button>
    </div>
  );
};
