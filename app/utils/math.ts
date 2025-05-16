import { Daily } from "../@types";

export const calculateAverageDailyDuration = (dailys: Daily[]): string => {
  if (dailys.length === 0) {
    return "0.00 minutos";
  }

  const totalDuration = dailys.reduce((acc, curr) => {
    return acc + curr.durationInMinutes;
  }, 0);

  const averageDuration = totalDuration / dailys.length;
  return `${averageDuration.toFixed(2)} minutos`;
};

export const calcTotalTasksCreated = (dailys: Daily[]) => {
  const totalTasksCreated = dailys.reduce((acc, curr) => {
    return acc + curr.numberOfTasksCreated;
  }, 0);

  return String(totalTasksCreated) + " tarefas";
};
