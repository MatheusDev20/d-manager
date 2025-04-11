"use client";
import { useState } from "react";
import { AppCalendar } from "../app-calendar";
import { ManagerDialogs } from "../dialogs/manager";
import { DeveloperProvider } from "@/app/context/developers";

export const HomeCalendar = () => {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    params: { date: Date | null };
  }>({ isOpen: false, params: { date: null } });

  const newDaily = async (date: Date) => {
    setDialogState({
      isOpen: true,
      params: { date: date as Date },
    });
  };

  const closeDialog = () =>
    setDialogState({ isOpen: false, params: { date: null } });

  return (
    <DeveloperProvider>
      <div className="border flex w-full p-4 h-screen flex-col items-center">
        <AppCalendar startNewDaily={newDaily} />
        {dialogState.params.date && (
          <ManagerDialogs dialogState={dialogState} closeDialog={closeDialog} />
        )}
      </div>
    </DeveloperProvider>
  );
};
