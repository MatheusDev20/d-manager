import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/src/lib/shadcdn/components/ui/sidebar";
import { Toaster } from "sonner";
import { ThemeProvider } from "../components/theme-provider";
import { AppSidebar } from "../components/sidebar/app-sidebar";
import { ModeToggle } from "../components/toggle-theme";

import { Avatar } from "@/src/lib/shadcdn/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

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
  // const session = await auth();

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
                      // src={session?.user?.image ?? ""}
                      alt="avatar"
                    />
                  </Avatar>
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
