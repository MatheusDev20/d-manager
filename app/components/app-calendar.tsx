import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale/pt-BR";
import { StartNewDaily } from "../page";

type Props = {
  startNewDaily: (data: StartNewDaily) => void;
};
export const AppCalendar = ({ startNewDaily }: Props) => {
  const handleDateClick = (date: Date) => {
    const startDate = new Date(date);
    const startTime = new Date();

    const clickedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const today = new Date(
      startTime.getFullYear(),
      startTime.getMonth(),
      startTime.getDate(),
    );

    const isPastDate = clickedDate < today;

    startDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
    startNewDaily({ day: date, begin: startDate, isPastDate });
  };

  return (
    <Calendar
      locale={ptBR}
      disabled={(date) => date > new Date()}
      onDayClick={handleDateClick}
      className="rounded-md border"
    />
  );
};
