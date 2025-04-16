"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Daily } from "@/src/app/@types";
import prisma from "@/src/lib/prisma";

export const create = async (daily: Daily) => {
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
