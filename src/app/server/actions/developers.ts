"use server";

import { addNewDeveloperTask } from "@/src/lib/db/developers";
import { TaskStatus } from "../../../@types";

export type NewTask = {
  description: string;
  customer: string;
  priority: string;
  status: TaskStatus;
};
type Args = {
  devId: number;
  formData: NewTask;
};

export async function createNewTaks(data: Args) {
  await addNewDeveloperTask(data.devId, data.formData);
}
