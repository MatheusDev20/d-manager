"use server";

import { findByMail } from "@/src/data";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/src/lib/iron-session";
import { redirect } from "next/navigation";

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
  const user = await findByMail(email as string);

  if (!user) return { errors: { message: "Email não encontrado!" } };
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  session.isLoggedIn = true;
  session.user = {
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    organization: user.organization,
  };
  await session.save();

  return redirect("/");
}
