import { Button } from "@/components/ui/button";
import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { useIpStore } from "@/store/ip";
import { Download, FileWarning } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { convertExcelGroups, validateGroups } from "../../utils/utils";
import type { GroupFieldName } from "../../utils/constants";

interface LoadGroupsFromExcelProps {
  className?: string;
}

interface Errors {
  row: Record<GroupFieldName, unknown>;
  issues: {
    field: string;
    message: string;
  }[];
}

export const LoadGroupsFromExcel = ({
  className,
}: LoadGroupsFromExcelProps) => {
  const { ip } = useIpStore();
  const [isLoading, startTransition] = useTransition();
  const [groupErrors, setGroupErrors] = useState<Errors[] | null>(null);

  const onLoadFile = async () => {
    if (!ip) return showNoIpMessage();

    startTransition(async () => {
      const filePath = await window.api.selectExcelFile();
      if (!filePath) {
        toast.warning("Файл не вибрали");
        return;
      }
      setGroupErrors(null);
      const result = await window.api.parseExcel(filePath);

      console.log("🚀 ~ onLoadFile ~ result:", result);

      if (result.error) {
        toast.error("Error", { description: result.error });
        return;
      }

      const convertedData = convertExcelGroups(result.data);
      const { valid, errors } = validateGroups(convertedData);

      const response = await window.api.setGroups(ip, valid);

      if (errors.length > 0) {
        setGroupErrors(errors);
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

      console.log("🚀 ~ onLoadFile ~ errors:", errors);
      console.log("🚀 ~ onLoadFile ~ valid:", valid);
    });
  };

  const onSaveLogs = async () => {
    console.log("🚀 ~ onSaveLogs ~ productErrors:", groupErrors);
    if (!groupErrors) return;
    const response = await window.api.saveValidationErrors(groupErrors);
    console.log("🚀 ~ onSaveLogs ~ response:", response);
    if (response.success) {
      toast.success(response.data);
    } else {
      toast.error("Щось пішло не так. Спробуйте ще раз");
    }
  };

  const loadTestFile = async () => {
    const result = await window.api.generateExampleGroups();
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };

  return (
    <div className={cn("flex gap-2 flex-col", className)}>
      <Button disabled={isLoading} onClick={onLoadFile}>
        Завантажити групи з .xls
        <Download />
      </Button>
      {groupErrors && (
        <Button variant="ghost" onClick={onSaveLogs}>
          Зберегти лог помилок
          <FileWarning />
        </Button>
      )}
      <Button variant="outline" onClick={loadTestFile}>
        Завантажити приклад .xls файлу
      </Button>
    </div>
  );
};
