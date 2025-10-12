import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import type { Check, CheckParams } from "@/lib/types";
import { useIpStore } from "@/store/ip";
import { useState } from "react";
import { toast } from "sonner";
import { CheckTable } from "./table/check-table";
import { SelectCheckParams } from "./components/check-params";
import { Loader2 } from "lucide-react";

export const CheckPate = () => {
  const { ip } = useIpStore();
  const [data, setData] = useState<Check[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = async (params: CheckParams) => {
    console.log("🚀 ~ loadData ~ params:", params);
    if (!ip) {
      showNoIpMessage();
      return;
    }
    setIsLoading(true);
    setError(null);
    const response = await window.api.getChecks(ip, params);
    setIsLoading(false);
    console.log("🚀 ~ loadData ~ response:", response);

    if (response.error) {
      showIpNotRespondingMessage();
      setError("IP is not responding.");
      setData(null);
      return;
    }
    if (!response.data.success) {
      setError(response.data.message);
      toast.error(response.data.message);
      setData(null);
      return;
    }

    setData(response.data.data.checks);
    setError(null);
    console.log("🚀 ~ loadData ~ response:", response);
  };

  return (
    <div className="h-full space-y-2">
      <SelectCheckParams onSelected={loadData} isLoading={isLoading} />

      {isLoading && (
        <div className="text-center py-4 flex items-center justify-center h-44">
          <Loader2 className="animate-spin mr-2" />
        </div>
      )}

      {data && <CheckTable checks={data} />}
      {!data && !error && !isLoading && (
        <p className="text-center py-4">
          Оберіть діапазон чеків та завантажте їх
        </p>
      )}
      {error && <p className="text-center py-2">{error}</p>}
    </div>
  );
};
