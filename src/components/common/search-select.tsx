import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

type ComboboxEditableBaseProps = {
  value: string;
  onChange: (value: string) => void;
  items: string[];
  placeholder?: string;
  className?: string;
};

export function ComboboxEditableBase({
  value,
  onChange,
  items,
  placeholder = "",
  className,
}: ComboboxEditableBaseProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("relative w-full", className)}>
      <Command className="rounded border">
        <CommandInput
          placeholder={placeholder}
          onBlur={() => {
            setTimeout(() => setOpen(false), 200);
          }}
          value={value || ""}
          onValueChange={(value) => {
            onChange(value);
            setOpen(true);
          }}
        />

        <div
          className={cn("absolute left-0 right-0 top-10 z-10 ", {
            hidden: !open,
          })}
        >
          <CommandGroup className="bg-background border rounded">
            <div className="max-h-56 overflow-y-auto">
              {items.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(current) => {
                    onChange(current);
                    setOpen(false);
                  }}
                >
                  {item}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </div>
      </Command>
    </div>
  );
}
