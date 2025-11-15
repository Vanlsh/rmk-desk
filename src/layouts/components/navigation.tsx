import { Button } from "@/components/ui/button";
import { type Routing } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";

interface NavigationProps {
  routes: Routing[];
  className?: string;
}
const isActive = (currentRout: Routing, pathname: string) => {
  if (currentRout.subPath)
    return (
      currentRout.subPath.some((route) => route.path === pathname) ||
      currentRout.path === pathname
    );
  else return currentRout.path === pathname;
};

export const Navigation = ({ className, routes }: NavigationProps) => {
  const location = useLocation();

  return (
    <ul className={cn("flex gap-2 ", className)}>
      {routes.map((route) => (
        <li key={route.path}>
          <Button
            asChild
            variant={isActive(route, location.pathname) ? "default" : "link"}
          >
            <NavLink to={route.path}>{route.label}</NavLink>
          </Button>
        </li>
      ))}
    </ul>
  );
};
