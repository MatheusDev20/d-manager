"use server";
import prisma from "@/lib/prisma";

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
