"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "@/app/lib/shadcdn/components/ui/calendar";

type Props = {
  startNewDaily: (date: Date) => void;
};

export const AppCalendar = ({ startNewDaily }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDateClick = (date: Date) => {
    startNewDaily(date);
  };
  if (!mounted) return null;
  return (
    <div className="flex justify-center">
      <Calendar
        timeZone="America/Sao_Paulo"
        disabled={(date) => date > new Date()}
        onDayClick={handleDateClick}
        className="rounded-md border"
      />
    </div>
  );
};
