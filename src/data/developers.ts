"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Developer } from "@/src/@types";
import { PendingTasks } from "@/src/app/generated/prisma";
import { NewTask } from "@/src/app/server/actions/developers";
import prisma from "@/src/lib/prisma";
import { cache } from "react";

type ListAllParams = {
  bringTasks: boolean;
  taskStatus?: "Pending" | "Completed";
};

export const list = cache(
  async ({ bringTasks, taskStatus }: ListAllParams): Promise<Developer[]> => {
    try {
      if (bringTasks && !taskStatus) throw new Error("Must have a status");

      const query = { tasks: { where: { status: taskStatus } } };
      const developers = await prisma.developer.findMany({
        include: bringTasks ? query : { tasks: false },
      });

      return developers as Developer[];
    } catch (err: any) {
      throw new Error(err);
    }
  },
);

/**
 * Saves a new pending task and assigns it to the developer with the given ID.
 *
 * @param devId - The ID of the developer
 * @param taskData - The data for the new pending task (excluding its auto-generated ID)
 * @returns The created pending task record
 */
export const addNewDeveloperTask = async (
  devId: number,
  taskData: NewTask,
): Promise<PendingTasks> => {
  try {
    return await prisma.pendingTasks.create({
      data: {
        ...taskData,
        developerId: devId,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
