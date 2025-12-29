import { Button } from "@/components/ui/button";
import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import { useIpStore } from "@/store/ip";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteArticlesButton = () => {
  const { ip } = useIpStore();

  const [isLoading, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!ip) {
      return showNoIpMessage();
    }
    const isConfirmed = await window.api.confirmDialog({
      message: "Видалити всі товари?",
      yesLabel: "Так",
      noLabel: "Ні",
    });

    if (!isConfirmed) return;
    startTransition(async () => {
      const response = await window.api.deleteArticles(ip);
      console.log("🚀 ~ handleDelete ~ response:", response);

      if (response.error) {
        showIpNotRespondingMessage();
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    });
  };
  return (
    <Button disabled={isLoading} variant="destructive" onClick={handleDelete}>
      Очистити товари
    </Button>
  );
};
