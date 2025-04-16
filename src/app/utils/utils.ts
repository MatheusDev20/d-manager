import { TaskPriority } from "@/src/@types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickPriorityColor(priority: string) {
  switch (priority) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

export function pickPriorityVariant(priority: TaskPriority): {
  type:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | null
    | undefined;
  label: string;
} {
  switch (priority) {
    case "high":
      return { type: "destructive", label: "Alta" };
    case "medium":
      return { type: "outline", label: "Média" };
    case "low":
      return { type: "success", label: "Baixa" };
    default:
      return { label: "Baixa", type: "default" };
  }
}

export const timeout = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const isEmailValid = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
