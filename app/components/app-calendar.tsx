import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale/pt-BR";

type Props = {
  startNewDaily: (date: Date) => void;
};
export const AppCalendar = ({ startNewDaily }: Props) => {
  const handleDateClick = (date: Date) => startNewDaily(date);

  return (
    <Calendar
      locale={ptBR}
      disabled={(date) => date > new Date()}
      onDayClick={handleDateClick}
      className="rounded-md border"
    />
  );
};
