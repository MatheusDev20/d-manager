import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/app/lib/shadcdn/components/ui/sidebar";
import { Toaster } from "sonner";
import { ThemeProvider } from "../components/theme-provider";
import { AppSidebar } from "../components/sidebar/app-sidebar";
import { ModeToggle } from "../components/toggle-theme";

import { Avatar } from "@/app/lib/shadcdn/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData } from "@/app/lib/iron-session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily Manager",
  description: "Be Productive, Be Happy",
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function getIronSessionData() {
    const session = await getIronSession<SessionData>(await cookies(), {
      cookieName: "d-manager-session",
      password: process.env.SESSION_SECRET as string,
    });
    return session;
  }

  const session = await getIronSessionData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 max-w-screen overflow-hidden">
              <header className="flex w-full items-center justify-between border-b p-4">
                <SidebarTrigger />
                <div className="flex gap-8 items-center">
                  <Avatar>
                    <AvatarImage
                      src={session?.user.avatarUrl ?? ""}
                      alt="avatar"
                    />
                  </Avatar>
                  <p className="font-bold">{session.user.name}</p>
                  <ModeToggle />
                </div>
              </header>
              {children}
              <Toaster />
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
