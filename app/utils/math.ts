import { Daily } from "../@types";

export const calculateAverageDailyDuration = (dailys: Daily[]) => {
  console.log("Calculating average daily duration...", dailys);
  const totalDuration = dailys.reduce((acc, curr) => {
    console.log("Current daily:", curr.durationInMinutes);
    return acc + curr.durationInMinutes;
  }, 0);

  const averageDuration = totalDuration / dailys.length;
  return String(averageDuration) + " minutos";
};

export const calcTotalTasksCreated = (dailys: Daily[]) => {
  const totalTasksCreated = dailys.reduce((acc, curr) => {
    return acc + curr.numberOfTasksCreated;
  }, 0);

  return String(totalTasksCreated) + " tarefas";
};
