"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/app/utils/utils";
import { buttonVariants } from "@/app/lib/shadcdn/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      startMonth={new Date(2025, 0, 1)}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-3",
        month: "flex flex-col ",
        month_caption: "flex p-3 justify-center items-center w-full",
        caption_label: "text-lg text-blue-300 font-medium",
        nav: "p-3 gap-1",
        button_previous: "text-blue-300  cursor-pointer font-bold",
        button_next: "text-blue-300 cursor-pointer w-[30px] font-bold",
        month_grid: "w-full border-collapse space-x-1",
        weekdays: "p-3 flex",
        weekday:
          "text-muted-foreground rounded-md w-23 font-normal text-[1rem]",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "md:size-24 size-16 p-0 cursor-pointer font-normal aria-selected:opacity-100",
        ),
        range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ className, ...props }) => {
          if (props.orientation === "left")
            return (
              <ChevronLeft className={cn("size-8", className)} {...props} />
            );
          else
            return (
              <ChevronRight className={cn("size-8 ", className)} {...props} />
            );
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
