import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale/pt-BR";

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
        locale={ptBR}
        disabled={(date) => date > new Date()}
        selected={new Date()}
        onDayClick={handleDateClick}
        // onDayClick={handleDateClick}
        className="rounded-md border"
      />
    </div>
  );
};
