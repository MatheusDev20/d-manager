"use server";
import prisma from "@/app/lib/prisma";

export async function doneTask(taskId: string) {
  try {
    const updatedTask = await prisma.pendingTasks.update({
      where: {
        id: taskId,
      },
      data: {
        status: "completed",
      },
    });

    return { success: true, task: updatedTask };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

type UpdateData = {
  taskId: string;
  description: string;
  priority: string;
};
export async function updateAction({
  description,
  priority,
  taskId,
}: UpdateData) {
  try {
    const updatedTask = await prisma.pendingTasks.update({
      where: {
        id: taskId,
      },
      data: {
        description,
        priority,
      },
    });

    return { success: true, task: updatedTask };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
