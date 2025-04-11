"use server";

import { create } from "@/lib/db/daily";
import { Daily } from "../@types";
import { timeout } from "@/lib/utils";

export const finishDaily = async (daily: Daily) => {
  await timeout(6000);
  await create(daily);
};
