import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const WindowControls = ({ className }: { className?: string }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const sendAction = async (
    action: "minimize" | "maximize" | "unmaximize" | "close"
  ) => {
    const result = await window.api.windowControl(action);
    if (result?.isMaximized !== undefined) setIsMaximized(result.isMaximized);
  };

  useEffect(() => {
    // try to get initial state by toggling noop
    window.api.windowControl("maximize").then(() => {
      window.api.windowControl("unmaximize").then((res) => {
        if (res?.isMaximized !== undefined) setIsMaximized(res.isMaximized);
      });
    });
  }, []);

  return (
    <div className={cn("flex items-center gap-1 -mr-1", className)}>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 px-0"
        onClick={() => sendAction("minimize")}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 px-0"
        onClick={() => sendAction(isMaximized ? "unmaximize" : "maximize")}
      >
        {isMaximized ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 px-0 hover:bg-destructive hover:text-destructive-foreground"
        onClick={() => sendAction("close")}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
