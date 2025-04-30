"use client";
import { useEffect, useState } from "react";
import { Clock, PauseIcon } from "lucide-react";
import { differenceInSeconds } from "date-fns";
import { Resume } from "@/app/components/icons/resume";

type CountdownTimerProps = {
  endDate: Date;
  onTimerEnd: () => void;
};
export const CountdownTimer = ({
  endDate,
  onTimerEnd,
}: CountdownTimerProps) => {
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
        onTimerEnd();
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
  }, [endDate, isRunning, onTimerEnd]);

  const formattedRemainingTime = `${remainingTime.minutes
    .toString()
    .padStart(2, "0")}:${remainingTime.seconds.toString().padStart(2, "0")}`;

  const isTimeAlmostUp =
    remainingTime.minutes === 0 && remainingTime.seconds <= 30;

  return (
    <>
      <div className="flex items-center gap-2 p-3 rounded-md">
        <Clock className="h-5 w-5 text-gray-500" />
        <div
          className={`font-mono text-lg font-bold ${
            isTimeAlmostUp ? "text-red-500 animate-pulse" : ""
          }`}
        >
          <span className={`${isRunning ? "text-white" : "text-yellow-400"}`}>
            {formattedRemainingTime}
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-1 self-center cursor-pointer ml-3 px-3 py-1 hover:bg-gray-800/30 rounded-md transition-all duration-200 group"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? (
          <div className="flex gap-1 items-center">
            <PauseIcon />
            <span className="font-medium text-white group-hover:text-yellow-400 transition-colors">
              Pausar
            </span>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <Resume />
            <span className="font-medium text-yellow-400 group-hover:text-green-400 transition-colors">
              Retomar
            </span>
          </div>
        )}
      </div>
    </>
  );
};
