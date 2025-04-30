/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/app/lib/shadcdn/components/ui/input";
import { add, format, differenceInMinutes } from "date-fns";
import { DailyScreen } from "./components/daily-screen";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/app/lib/shadcdn/components/ui/button";
import { useState, useRef } from "react";

import { v4 } from "uuid";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { TableSkeleton } from "@/app/components/table/skeleton";
import { Daily } from "@/app/@types";
import { finishDaily } from "@/app/server/actions/dailys";
import { LoadingProgressDialog } from "@/app/components/dialogs/loading";
import { CountdownTimer } from "./components/clock-timer";

export default function Page() {
  const initialDate = useRef(new Date()).current;
  const endDate = useRef(add(initialDate, { minutes: 30 })).current;

  const [finishedAfterCountdown, setFinishedAfterCountdown] = useState(false);
  const [tasksCreated, setTaksCreated] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["developers"],
    queryFn: async () => {
      const response = await fetch("/api/developers?taskStatus=Pending");
      if (!response.ok) throw new Error("Network response was not ok");

      return response.json();
    },

    refetchOnWindowFocus: true,
  });

  if (isLoading) return <TableSkeleton />;

  const handleTimerEnd = () => {
    setFinishedAfterCountdown(true);
  };
  const cancelDaily = () => {
    redirect("/");
  };
  const finish = async () => {
    setLoading(true);
    let progressValue = 0;
    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 15;
      if (progressValue > 90) {
        progressValue = 90; // Cap at 90% until the action completes
      }
      setProgress(Math.min(progressValue, 100));
    }, 300);

    const current = new Date();
    const payload: Daily = {
      id: v4(),
      numberOfTasksCreated: tasksCreated,
      durationInMinutes: differenceInMinutes(current, initialDate),
      wasFinishedInTime: finishedAfterCountdown,
      day: format(initialDate, "yyyy-MM-dd"),
      started_at: initialDate,
      finished_at: current,
    };

    try {
      await finishDaily(payload);
      setProgress(100);
      clearInterval(progressInterval);

      setTimeout(() => {
        setLoading(false);
        toast.success("Daily finalizada com sucesso!", {
          position: "top-right",
          richColors: true,
        });
        redirect("/");
      }, 500);
    } catch (error: any) {
      clearInterval(progressInterval);
      setLoading(false);
      toast.error("Erro ao finalizar a Daily", {
        position: "top-right",
        richColors: true,
      });
    }
  };
  return (
    <>
      <LoadingProgressDialog isOpen={loading} progress={progress} />
      <main className="md:p-8 p-3 flex flex-col justify-between max-w-screen">
        <header className="p-2 flex flex-wrap md:flex-nowrap min-h-[42px] border-b border-gray-500 items-center">
          <h1 className="text-lg font-bold self-center text-gray-700 dark:text-gray-300">
            {format(initialDate, "dd/MM/yyyy")}
          </h1>
          <div className="flex gap-3 p-2">
            <span className="min-w-24 text-center mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Início
            </span>
            <Input
              className="w-24 text-center"
              disabled
              value={format(initialDate, "HH:mm")}
            />
          </div>
          <div className="flex gap-3 p-2">
            <span className="min-w-24 text-center mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Previsão de término
            </span>
            <Input
              className="w-24 text-center"
              disabled
              value={format(endDate, "HH:mm")}
            />
          </div>
          {/* Isolated countdown component */}
          <CountdownTimer endDate={endDate} onTimerEnd={handleTimerEnd} />

          <Button
            onClick={finish}
            className="cursor-pointer font-medium text-black bg-sidebar-foreground ml-auto"
          >
            Finalizar
          </Button>

          <Button
            onClick={cancelDaily}
            className="cursor-pointer font-medium text-black bg-destructive hover:bg-chart-5 ml-4"
          >
            Cancelar
          </Button>
        </header>

        <div className="flex-1 mt-4">
          {data && (
            <DailyScreen
              developers={data}
              tasksCreated={tasksCreated}
              setTaksCreated={setTaksCreated}
            />
          )}
        </div>
      </main>
    </>
  );
}
