import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product";

const DownloadProductButton = () => {
  const { product } = useProductStore();
  const handleExportToExcel = () => {
    console.log("DownloadProductButton", product);
  };

  console.log("🚀 ~ DownloadProductButton ~ product:", product);
  return product?.length ? (
    <Button size="sm" variant="outline" onClick={handleExportToExcel}>
      Експорт Excel
    </Button>
  ) : null;
};

export default DownloadProductButton;
