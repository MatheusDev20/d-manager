import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData } from "@/app/lib/iron-session";
import { list } from "@/app/data";
import { DeveloperTasks } from "../daily/components/task";
import { Accordion } from "@/app/lib/shadcdn/components/ui/accordion";
import { Suspense } from "react";

export default async function Page() {
  async function getIronSessionData() {
    const session = await getIronSession<SessionData>(await cookies(), {
      cookieName: "d-manager-session",
      password: process.env.SESSION_SECRET as string,
    });
    return session;
  }

  const session = await getIronSessionData();
  const developers = await list({ bringTasks: true, taskStatus: "Pending" });
  const loggedDeveloper = developers.find(
    (dev) => dev.name.toLowerCase() === session.user.name.toLowerCase(),
  );

  if (!loggedDeveloper) return null;

  return (
    <div className="flex h-full flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas pendências</h1>
      <Suspense fallback={<p>Carregando pendências...</p>}>
        <Accordion type="single" collapsible>
          <DeveloperTasks developer={loggedDeveloper} />
        </Accordion>
      </Suspense>
    </div>
  );
}
