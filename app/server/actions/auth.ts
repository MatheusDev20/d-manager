/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { findByMail } from "@/app/data";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/app/lib/iron-session";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/app/lib/bcrypt";

type SignInFormState = {
  errors: {
    message: string;
  };
};

export async function logout() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  session.destroy();
  redirect("/");
}

export async function signin(
  _: SignInFormState | undefined,
  formData: FormData,
) {
  let redirectAfterSignIn: string | null = null;

  try {
    const email = formData.get("email");
    const formPassword = formData.get("password");

    const user = await findByMail(email as string);
    if (!user) return { errors: { message: "Email não encontrado!" } };
    const { password } = user;

    const matchedPassword = await verifyPassword(
      formPassword as string,
      password,
    );
    if (!matchedPassword)
      return { errors: { message: "Senha ou Email incorretos" } };

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
    redirectAfterSignIn = "/";
  } catch (error: any) {
    return {
      errors: {
        message: "Ocorreu um erro inesperado, tente novamente mais tarde!",
      },
    };
  } finally {
    if (redirectAfterSignIn) redirect(redirectAfterSignIn);
  }
}
