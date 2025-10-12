import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { CheckParams } from "@/lib/types";

interface SelectCheckParamsProps {
  onSelected: (params: CheckParams) => void;
  isLoading: boolean;
}

export const SelectCheckParams = ({
  onSelected,
  isLoading,
}: SelectCheckParamsProps) => {
  const [params, setParams] = useState<{
    date_from: Date | null;
    date_to: Date | null;
  }>({
    date_from: new Date(),
    date_to: new Date(),
  });

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range) return;
    const { from, to } = range;

    // Prevent selecting end date before start date
    if (from && to && to < from) return;

    setParams({
      date_from: from ?? params.date_from,
      date_to: to ?? params.date_to,
    });
  };

  const handleConfirm = () => {
    if (params.date_from && params.date_to && onSelected) {
      onSelected({
        date_from: format(params.date_from, "dd-MM-yyyy"),
        date_to: format(params.date_to, "dd-MM-yyyy"),
      });
    }
  };

  const formattedRange =
    params.date_from && params.date_to
      ? `${format(params.date_from, "dd.MM.yyyy", { locale: uk })} — ${format(
          params.date_to,
          "dd.MM.yyyy",
          { locale: uk }
        )}`
      : "Оберіть період";

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[250px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedRange}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={{
              from: params.date_from ?? undefined,
              to: params.date_to ?? undefined,
            }}
            onSelect={handleSelect}
            locale={uk}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Button
        onClick={handleConfirm}
        disabled={!params.date_from || !params.date_to || isLoading}
      >
        Показати чеки
      </Button>
    </div>
  );
};
