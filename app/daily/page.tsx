"use client";
import { Input } from "@/components/ui/input";
import { add, format, differenceInSeconds } from "date-fns";
import { Team } from "./components/team";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { TableSkeleton } from "../components/table/skeleton";
import { Clock } from "lucide-react";

export default function Page() {
  const initialDate = useRef(new Date()).current;
  const endDate = useRef(add(initialDate, { minutes: 30 })).current;

  const [remainingTime, setRemainingTime] = useState<{
    minutes: number;
    seconds: number;
  }>({ minutes: 30, seconds: 0 });

  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const calculateTime = () => {
      const now = new Date();
      const diffInSeconds = differenceInSeconds(endDate, now);
      if (diffInSeconds <= 0) {
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
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  const formattedRemainingTime = `${remainingTime.minutes
    .toString()
    .padStart(2, "0")}:${remainingTime.seconds.toString().padStart(2, "0")}`;

  const isTimeAlmostUp =
    remainingTime.minutes === 0 && remainingTime.seconds <= 30;

  return (
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
          className="self-center text-white ml-2 font-medium bg-secondary"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Pausar" : "Retomar"}
        </Button>

        <Button className="self-center cursor-pointer text-white font-medium bg-primary ml-auto">
          Finalizar
        </Button>
      </header>

      <div className="flex-1 mt-4">{data && <Team developers={data} />}</div>
    </main>
  );
}
