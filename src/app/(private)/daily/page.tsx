/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/src/lib/shadcdn/components/ui/input";
import {
  add,
  format,
  differenceInSeconds,
  differenceInMinutes,
} from "date-fns";
import { Team } from "./components/team";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/src/lib/shadcdn/components/ui/button";
import { useEffect, useState, useRef } from "react";

import { Clock } from "lucide-react";

import { v4 } from "uuid";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { TableSkeleton } from "@/src/app/components/table/skeleton";
import { Daily } from "@/src/app/@types";
import { finishDaily } from "@/src/app/server/actions/dailys";
import { LoadingProgressDialog } from "@/src/app/components/dialogs/loading";

export default function Page() {
  const initialDate = useRef(new Date()).current;
  const endDate = useRef(add(initialDate, { minutes: 30 })).current;

  const [remainingTime, setRemainingTime] = useState<{
    minutes: number;
    seconds: number;
  }>({ minutes: 30, seconds: 0 });

  const [isRunning, setIsRunning] = useState(true);
  const [finishedAfterCountdown, setFinishedAfterCountdown] = useState(false);
  const [tasksCreated, setTaksCreated] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const calculateTime = () => {
      const now = new Date();
      const diffInSeconds = differenceInSeconds(endDate, now);
      if (diffInSeconds <= 0) {
        setFinishedAfterCountdown(true);
        setRemainingTime({ minutes: 0, seconds: 0 });
        setIsRunning(false);
        return false;
      }

      const minutes = Math.floor(diffInSeconds / 60);
      const seconds = diffInSeconds % 60;

      setRemainingTime({ minutes, seconds });
      return true;
    };

    if (!calculateTime()) return;

    const timer = setInterval(() => {
      calculateTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, isRunning]);

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

  const formattedRemainingTime = `${remainingTime.minutes
    .toString()
    .padStart(2, "0")}:${remainingTime.seconds.toString().padStart(2, "0")}`;

  const isTimeAlmostUp =
    remainingTime.minutes === 0 && remainingTime.seconds <= 30;

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

          <div className="flex items-center gap-2  p-3 rounded-md">
            <Clock className="h-5 w-5 text-gray-500" />
            <div
              className={`font-mono text-lg font-bold ${
                isTimeAlmostUp ? "text-red-500 animate-pulse" : ""
              }`}
            >
              {formattedRemainingTime}
            </div>
          </div>

          <Button
            className="self-center cursor-pointer text-white ml-2 font-medium bg-secondary"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pausar" : "Retomar"}
          </Button>

          <Button
            onClick={finish}
            className="self-center cursor-pointer font-medium text-black bg-sidebar-foreground ml-auto"
          >
            Finalizar
          </Button>
        </header>

        <div className="flex-1 mt-4">
          {data && (
            <Team
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
