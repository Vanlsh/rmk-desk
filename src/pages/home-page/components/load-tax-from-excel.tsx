import { Button } from "@/components/ui/button";
import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { useIpStore } from "@/store/ip";
import { Download, FileWarning } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { convertExcelTax, validateTax } from "./forms/utils";
import type { TaxFieldName } from "./forms/constants";

interface LoadTaxFromExcelProps {
  className?: string;
}

interface Errors {
  row: Record<TaxFieldName, unknown>;
  issues: {
    field: string;
    message: string;
  }[];
}

export const LoadTaxFromExcel = ({ className }: LoadTaxFromExcelProps) => {
  const { ip } = useIpStore();
  const [isLoading, startTransition] = useTransition();
  const [taxErrors, setTaxErrors] = useState<Errors[] | null>(null);

  const onLoadFile = async () => {
    if (!ip) return showNoIpMessage();

    startTransition(async () => {
      const filePath = await window.api.selectExcelFile();
      if (!filePath) {
        toast.warning("Файл не вибрали");
        return;
      }
      setTaxErrors(null);
      const result = await window.api.parseExcel(filePath);

      console.log("🚀 ~ onLoadFile ~ result:", result);

      if (result.error) {
        toast.error("Error", { description: result.error });
        return;
      }

      const convertedData = convertExcelTax(result.data);
      const { valid, errors } = validateTax(convertedData);

      const response = await window.api.setTaxes(ip, valid);

      if (response.error) {
        showIpNotRespondingMessage();
        return;
      }

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      if (errors.length > 0) {
        setTaxErrors(errors);
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
    console.log("🚀 ~ onSaveLogs ~ productErrors:", taxErrors);
    if (!taxErrors) return;
    const response = await window.api.saveValidationErrors(taxErrors);
    console.log("🚀 ~ onSaveLogs ~ response:", response);
    if (response.success) {
      toast.success(response.data);
    } else {
      toast.error("Щось пішло не так. Спробуйте ще раз");
    }
  };
  return (
    <div className={cn("flex gap-2 flex-col", className)}>
      <Button disabled={isLoading} onClick={onLoadFile}>
        Завантажити податок з .xml
        <Download />
      </Button>
      {taxErrors && (
        <Button variant="ghost" onClick={onSaveLogs}>
          Зберегти лог помилок
          <FileWarning />
        </Button>
      )}
    </div>
  );
};
