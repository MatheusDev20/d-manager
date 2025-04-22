import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const useSession = () => {
  async function getIronSessionData() {
    const session = await getIronSession(await cookies(), {
      cookieName: "d-manager-session",
      password: process.env.SESSION_SECRET as string,
    });
    return session;
  }

  const data = getIronSessionData();

  return { data };
};
