"use server";

import { Daily } from "../../../@types";
import { timeout } from "@/src/app/utils/utils";
import { saveDaily } from "@/src/data";

export const finishDaily = async (daily: Daily) => {
  await timeout(2000);
  await saveDaily(daily);
};
