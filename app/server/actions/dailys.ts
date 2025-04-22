"use server";

import { Daily } from "../../@types";
import { timeout } from "@/app/utils/utils";
import { saveDaily } from "@/app/data";

export const finishDaily = async (daily: Daily) => {
  await timeout(2000);
  await saveDaily(daily);
};
