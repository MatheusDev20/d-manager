"use client";

import { useState } from "react";
import { AppCalendar } from "../components/app-calendar";
import { ManagerDialogs } from "../components/dialogs/manager";
import { DeveloperProvider } from "../context/developers";

export default function Page() {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    params: { date: Date | null };
  }>({ isOpen: false, params: { date: null } });
  const [isLoading, setLoading] = useState(false);

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
      <div className="flex w-full p-4 h-screen flex-col items-center">
        {isLoading && <BackdropSpinner />}
        <AppCalendar startNewDaily={newDaily} />
        {dialogState.params.date && (
          <ManagerDialogs
            setLoading={setLoading}
            dialogState={dialogState}
            closeDialog={closeDialog}
          />
        )}
      </div>
    </DeveloperProvider>
  );
}

const BackdropSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="relative">
      <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
      <div className="mt-4 text-white font-medium">Carregando...</div>
    </div>
  </div>
);
