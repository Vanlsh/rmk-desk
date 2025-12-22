import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

export const CheckUpdatesButton = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  const handleClick = async () => {
    setIsChecking(true);
    try {
      const result = await window.api.checkForUpdates();

      if (result.status === "unavailable") {
        toast.info(result.message);
        return;
      }

      if (result.status === "up-to-date") {
        toast.success("У вас вже остання версія");
        return;
      }

      if (result.status === "downloaded") {
        toast.success(`Оновлення ${result.version} завантажено`);
        const confirmInstall = window.confirm(
          "Перезапустити додаток для встановлення оновлення?"
        );
        if (confirmInstall) {
          await window.api.installUpdate();
        } else {
          toast.info("Оновлення буде застосовано після перезапуску.");
        }
        return;
      }

      toast.error(result.message || "Не вдалося перевірити оновлення");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Не вдалося перевірити оновлення"
      );
    } finally {
      setIsChecking(false);
      setProgress(null);
    }
  };

  // subscribe to download progress
  window.api.onUpdateDownloadProgress((info) => {
    setProgress(info.percent);
  });

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={handleClick}
      disabled={isChecking}
      className="gap-2"
      title={
        progress !== null ? `Завантажено ${progress.toFixed(0)}%` : undefined
      }
    >
      Перевірити оновлення
      <RefreshCw className="h-4 w-4" />
      {progress !== null && (
        <span className="text-xs text-muted-foreground">
          {progress.toFixed(0)}%
        </span>
      )}
    </Button>
  );
};
