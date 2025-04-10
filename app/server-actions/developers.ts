"use server";

import { addNewDeveloperTask } from "@/lib/db";
import { TaskStatus } from "../@types";

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

export async function create(data: Args) {
  console.log("FormData", data.formData);
  await addNewDeveloperTask(data.devId, data.formData);
}
