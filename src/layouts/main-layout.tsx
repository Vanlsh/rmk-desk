import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { IpForms } from "./components/forms/ip-forms";

export const MainLayout = () => {
  return (
    <div className="px-2">
      <div className="p-2 h-16 flex justify-between gap-2 fixed top-0 left-0 right-0 bg-background border-b">
        <IpForms />
        <Navigation />
      </div>

      <div className="py-3 pt-20">
        <Outlet />
      </div>
      <Toaster position="top-right" closeButton />
    </div>
  );
};
