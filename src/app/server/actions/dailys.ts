"use server";

import { create } from "@/src/lib/db/daily";
import { Daily } from "../../../@types";
import { timeout } from "@/src/app/utils/utils";

export const finishDaily = async (daily: Daily) => {
  await timeout(6000);
  await create(daily);
};
