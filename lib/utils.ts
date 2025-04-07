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

export function pickPriorityVariant(priority: string) {
  switch (priority) {
    case "High":
      return "destructive";
    case "Medium":
      return "outline";
    case "Low":
      return "success";
    default:
      return "default";
  }
}
