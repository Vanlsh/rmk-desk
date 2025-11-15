import { programRouts } from "@/lib/constants";

import { Outlet } from "react-router-dom";
import { Navigation } from "./components/navigation";

const SettingLayout = () => {
  return (
    <div className="space-y-2">
      <Navigation routes={programRouts} />
      <Outlet />
    </div>
  );
};

export default SettingLayout;
