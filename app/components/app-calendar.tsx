/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "@/app/lib/shadcdn/components/ui/calendar";
import { Dailys } from "../generated/prisma";

type Props = {
  startNewDaily: (date: Date) => void;
  monthDailys: Dailys[];
  updateMonth: (data: any) => void;
};

export const AppCalendar = ({
  startNewDaily,
  monthDailys,
  updateMonth,
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDateClick = (date: Date) => {
    startNewDaily(date);
  };

  const realizedDailys = monthDailys.map(
    (daily) => new Date(`${daily.day}T00:00:00`),
  );

  const updateParentState = (data: any) => {
    updateMonth(data);
  };

  if (!mounted) return null;
  return (
    <div className="flex justify-center">
      <Calendar
        timeZone="America/Sao_Paulo"
        onMonthChange={(data) => updateParentState(data)}
        disabled={(date) => date > new Date()}
        onDayClick={handleDateClick}
        modifiers={{
          realized: realizedDailys,
          weekend: (date) => {
            const d = date.getDay();
            return d === 0 || d === 6;
          },
        }}
        modifiersClassNames={{
          realized: "text-green-400 font-bold",
          weekend: "text-red-400 font-bold rounded-full",
        }}
        className="rounded-md border"
      />
    </div>
  );
};
