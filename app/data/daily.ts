"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Daily, FetchInterval } from "@/app/@types";
import prisma from "@/app/lib/prisma";

export const saveDaily = async (daily: Daily) => {
  try {
    await prisma.dailys.create({
      data: daily,
    });
  } catch (err: any) {
    console.error(err);
    throw new Error("Error persisting daily", err);
  }
};

export const getByCalendarDay = async (day: string): Promise<Daily | null> => {
  try {
    const daily = await prisma.dailys.findFirst({
      where: {
        day: { equals: day },
      },
    });

    return daily as Daily;
  } catch (err: any) {
    console.error(err);
    throw new Error("Error fetching daily", err);
  }
};

export const getDailyByInterval = async (interval: FetchInterval) => {
  const { start, end } = interval;
  try {
    const dailys = await prisma.dailys.findMany({
      where: {
        finished_at: {
          gte: start,
          lte: end,
        },
      },
    });
    return dailys as Daily[];
  } catch (err: any) {
    console.error(err);
    throw new Error("Error fetching daily by Interval", err);
  }
};
