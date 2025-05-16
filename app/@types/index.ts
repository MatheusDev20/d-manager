/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react";

type PendingTask = {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  priority: TaskPriority;
  customer: string | null;
  developerId: number;
};

export type TaskStatus = "Pending" | "Completed";
export type TaskPriority = "high" | "medium" | "low";

export type Developer = {
  id: number;
  name: string;
  picture: string;
  status: string;
  tasks: PendingTask[];
};

export type Daily = {
  id: string;
  day: string;
  started_at: Date;
  finished_at: Date;
  durationInMinutes: number;
  numberOfTasksCreated: number;
  wasFinishedInTime: boolean;
};

export type FetchInterval = {
  start: string;
  end: string;
};

export type StatsGeneralMetris = {
  title: string;
  icon: JSX.Element;
  data: any;
  calc: (dailys: Daily[]) => string;
};
