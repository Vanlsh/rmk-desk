import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import type { Check, CheckParams } from "@/lib/types";
import { useIpStore } from "@/store/ip";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckTable } from "./table/check-table";

export const CheckPate = () => {
  const { ip } = useIpStore();
  const [data, setData] = useState<Check[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadin, setIsLoading] = useState<boolean>(false);
  const [params, setParams] = useState<CheckParams>();
  useEffect(() => {
    if (ip) {
      const loadData = async () => {
        setIsLoading(true);
        setError(null);
        const response = await window.api.getChecks(ip, {
          date_from: "22-09-2025",
          date_to: "30-09-2025",
        });
        setIsLoading(false);
        console.log("🚀 ~ loadData ~ response:", response);

        if (response.error) {
          showIpNotRespondingMessage();
          return;
        }
        if (!response.data.success) {
          setError(response.data.message);
          toast.error(response.data.message);
          setData(null);
          return;
        }

        setData(response.data.data.checks);
        console.log("🚀 ~ loadData ~ response:", response);
      };
      loadData();
    } else {
      showNoIpMessage();
    }
  }, [ip]);

  return <div className="h-full">{data && <CheckTable checks={data} />}</div>;
};
