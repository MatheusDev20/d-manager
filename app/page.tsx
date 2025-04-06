"use client";

import { useState } from "react";
import { AppCalendar } from "./components/app-calendar";
import { ManagerDialogs } from "./components/dialogs/manager";

export type StartNewDaily = {
  day: Date | null;
  begin: Date | null;
  isPastDate: boolean;
};

export default function Home() {
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
    <div className="border flex w-full pt-12 h-screen flex-col items-center">
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
  );
}
