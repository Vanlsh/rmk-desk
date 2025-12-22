import { Toaster } from "sonner";
import { Navigation } from "./components/navigation";
import { IpForms } from "./components/forms/ip-forms";
import { useIpStore } from "@/store/ip";
import { useEffect } from "react";
import { useProductStore } from "@/store/product";
import { routing } from "@/lib/constants";
import { Outlet } from "react-router-dom";
import { showIpNotRespondingMessage } from "@/lib/messages";
import { CheckUpdatesButton } from "./components/check-updates-button";

export const MainLayout = () => {
  const { ip } = useIpStore();
  const { error, fetchProduct } = useProductStore();

  useEffect(() => {
    if (ip) fetchProduct(ip);
  }, [ip, fetchProduct]);

  useEffect(() => {
    if (error) showIpNotRespondingMessage();
  }, [error]);

  return (
    <div className="px-2">
      <div className="p-2 h-16 flex justify-between gap-2 fixed top-0 left-0 right-0 bg-background border-b">
        <IpForms />
        <div className="flex items-center gap-2">
          <Navigation routes={[...routing]} />
          <CheckUpdatesButton />
        </div>
      </div>

      <div className="py-3 pt-20">
        <Outlet />
      </div>
      <Toaster position="top-right" closeButton />
    </div>
  );
};
