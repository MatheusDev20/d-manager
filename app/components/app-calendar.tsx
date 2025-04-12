"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  startNewDaily: (date: Date) => void;
};
export const AppCalendar = ({ startNewDaily }: Props) => {
  const handleDateClick = (date: Date) => {
    startNewDaily(date);
  };

  return (
    <div className="flex justify-center">
      <Calendar
        timeZone="America/Sao_Paulo"
        disabled={(date) => date > new Date()}
        onDayClick={handleDateClick}
        // onDayClick={handleDateClick}
        className="rounded-md border"
      />
    </div>
  );
};
