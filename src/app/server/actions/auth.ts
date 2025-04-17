"use server";

import { findByMail } from "@/src/data";
import { timeout } from "../../utils/utils";

type SignInFormState = {
  errors: {
    message: string;
  };
};

export async function signin(
  state: SignInFormState | undefined,
  formData: FormData,
) {
  const email = formData.get("email");
  console.log("Signin formData", email);
  await timeout(5000);
  const user = await findByMail(email as string);

  if (!user) return { errors: { message: "Email não encontrado!" } };

  // await fetch("http://localhost:3000/api/auth/login", {
  //   body: JSON.stringify({ password, email }),
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // });
}
