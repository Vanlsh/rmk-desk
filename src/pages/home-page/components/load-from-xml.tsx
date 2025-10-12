import { Button } from "@/components/ui/button";
import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import { useIpStore } from "@/store/ip";
import { Download } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { convertExcelData, validateProducts } from "./forms/utils";

export const LoadFromXmlFile = () => {
  const { ip } = useIpStore();
  const [isLoading, startTransition] = useTransition();

  const onLoadFile = async () => {
    if (!ip) return showNoIpMessage();

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
        // TODO: Do something
      }

      toast.success(response.data.message);

      console.log("🚀 ~ onLoadFile ~ errors:", errors);
      console.log("🚀 ~ onLoadFile ~ valid:", valid);
    });
  };

  return (
    <Button disabled={isLoading} onClick={onLoadFile}>
      Завантажити товари з .xml
      <Download />
    </Button>
  );
};
