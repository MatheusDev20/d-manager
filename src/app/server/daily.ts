import { format } from "date-fns";
import { Daily } from "../@types";

type FetchDailyFilter = {
  date: Date;
};

type FetchDailyResponse = {
  daily: Daily;
  status: number;
  message: string;
};

export const fetchDaily = async (
  data: FetchDailyFilter,
): Promise<FetchDailyResponse | null> => {
  const { date } = data;

  const response = await fetch(
    `/api/daily?byDay=${format(new Date(date), "yyyy-MM-dd")}`,
  );

  if (response.ok) {
    const parsed = await response.json();
    const { data, status } = parsed;
    return { daily: data as Daily, status, message: "Success!" };
  }

  return null;
};
