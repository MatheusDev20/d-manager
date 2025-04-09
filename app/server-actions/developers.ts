/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { addNewDeveloperTask } from "@/lib/db";

type Args = {
  devId: number;
  formData: any;
};
export async function create(data: Args) {
  // Validações
  await addNewDeveloperTask(data.devId, data.formData);
}
