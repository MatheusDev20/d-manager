/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/app/lib/shadcdn/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/lib/shadcdn/components/ui/popover";
import { PickerCalendar } from "@/app/lib/shadcdn/components/ui/picker-calendar";
import { getDateObj } from "@/app/utils/utils";
export function InputPicker({
  change,
  value,
}: {
  change: any;
  value?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    value ? getDateObj(value) : undefined,
  );

  return (
    <div className="flex flex-col gap-3">
      {!value && <span className="text-sm">Deadline estimada</span>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal"
          >
            {date
              ? date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Selecione uma data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <PickerCalendar
            mode="single"
            selected={date}
            disabled={(date) => date < new Date()}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              change(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
