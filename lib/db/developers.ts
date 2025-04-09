import { Developer } from "@/app/@types";
import { PendingTasks } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { cache } from "react";

type ListAllParams = {
  bringTasks: boolean;
};

export const list = cache(
  async ({ bringTasks }: ListAllParams): Promise<Developer[]> => {
    const developers = prisma.developer.findMany({
      include: { tasks: bringTasks },
    });

    return developers;
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
  taskData: Omit<PendingTasks, "id">,
): Promise<PendingTasks> => {
  // const { devId, ...rest } = taskData;

  return await prisma.pendingTasks.create({
    data: {
      ...taskData,
      // Relate the task to a developer by setting the foreign key.
      // Alternatively, you can use a nested connect if your Prisma schema uses a relation field.
      developerId: devId,
      // If using a relation field, uncomment the following and adjust the field name:
      // developer: { connect: { id: devId } },
    },
  });
};
