import { Button } from "@/components/ui/button";
import { labelToNameMap } from "@/pages/utils/constants";
import { covertToExcelData } from "@/pages/utils/utils";
import { useProductStore } from "@/store/product";

const DownloadProductButton = () => {
  const { product } = useProductStore();
  const handleExportToExcel = () => {
    if (!product) return;
    console.log("🚀 ~ DownloadProductButton ~ product:", product);
    const data = covertToExcelData(product, labelToNameMap);
    console.log("🚀 ~ handleExportToExcel ~ labelToNameMap:", labelToNameMap);
    console.log("DownloadProductButton", data);
    try {
      window.api.downloadExcel(data, "products", "Товари");
    } catch (error) {
      console.error("handleExportToExcel", error);
    }
  };

  console.log("🚀 ~ DownloadProductButton ~ product:", product);
  return product?.length ? (
    <Button size="sm" variant="outline" onClick={handleExportToExcel}>
      Експорт Excel
    </Button>
  ) : null;
};

export default DownloadProductButton;
