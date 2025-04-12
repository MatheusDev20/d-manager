"use server";
import { signIn } from "@/src/app/api/auth/auth";

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const signOut = async () => {
  await signOut();
};
