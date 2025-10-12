import { Button } from "@/components/ui/button";
import { routing } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";

interface NavigationProps {
  className?: string;
}
export const Navigation = ({ className }: NavigationProps) => {
  const location = useLocation();
  console.log("🚀 ~ Navigation ~ location:", location);

  return (
    <ul className={cn("flex gap-2 ", className)}>
      {routing.map((route) => (
        <li key={route.path}>
          <Button
            asChild
            variant={location.pathname === route.path ? "default" : "link"}
          >
            <NavLink to={route.path}>{route.label}</NavLink>
          </Button>
        </li>
      ))}
    </ul>
  );
};
