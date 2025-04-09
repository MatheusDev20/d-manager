"use client";
import { useState } from "react";
import { AppCalendar } from "../app-calendar";
import { ManagerDialogs } from "../dialogs/manager";
import { StartNewDaily } from "@/app/page";
import { DeveloperProvider } from "@/app/context/developers";

export const HomeCalendar = () => {
  const [dialogState, setDialogState] = useState<{
    type: "new" | "details" | null;
    open: boolean;
  }>({ type: null, open: false });

  const [dailyData, setDailyData] = useState<Omit<StartNewDaily, "isPastDate">>(
    {
      day: null,
      begin: null,
    },
  );

  const newDaily = (data: StartNewDaily) => {
    const { isPastDate } = data;
    if (isPastDate) {
      setDialogState({ type: "details", open: true });
      return;
    }
    setDailyData(data);
    setDialogState({ type: "new", open: true });
  };

  const closeDialog = () => setDialogState({ type: null, open: false });

  return (
    <DeveloperProvider>
      <div className="border flex w-full p-4 h-screen flex-col items-center">
        <AppCalendar startNewDaily={newDaily} />
        {dialogState.type && (
          <ManagerDialogs
            type={dialogState.type}
            isOpen={dialogState.open}
            closeDialog={closeDialog}
            dailyData={dailyData}
          />
        )}
      </div>
    </DeveloperProvider>
  );
};
