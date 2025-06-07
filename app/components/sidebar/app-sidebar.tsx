"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Settings,
  UsersRound,
  Calendar,
  ChartColumn,
  LogOutIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/app/lib/shadcdn/components/ui/sidebar";
import { ORG } from "@/app/generated/prisma";
import { logout } from "@/app/server/actions/auth";
import { Badge } from "@/app/lib/shadcdn/components/ui/badge";

const items = [
  { title: "Calendário", url: "/", icon: Calendar },
  { title: "Time", url: "/team", icon: UsersRound },
  { title: "Configurações", url: "/settings", icon: Settings },
  { title: "Minhas Pendências", url: "/my-tasks", icon: Calendar, isNew: true },
  { title: "Estatísticas", url: "/stats", icon: ChartColumn, isAlpha: true },
];

type Props = { organization: ORG | null };
export function AppSidebar({ organization }: Props) {
  const path = usePathname();

  return (
    <Sidebar className="h-screen">
      <SidebarContent className="flex flex-col justify-between h-full p-4">
        {/* ——— Logo + Org Top ——— */}
        <Link href="/" className="flex flex-col gap-2 mb-8">
          <div className="flex gap-4 justify-start items-center">
            <Image src="/clock.png" alt="Logo" width={32} height={32} />
            <span className="text-lg font-semibold">Daily Manager</span>
          </div>
          {organization && (
            <div className="pt-4 border-t flex items-center gap-4 mt-4">
              <Image
                src={organization.picture}
                alt={organization.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-lg font-semibold">{organization.name}</p>
            </div>
          )}
        </Link>

        {/* ——— Navigation ——— */}
        <SidebarMenu className="flex-1 flex flex-col gap-1">
          {items.map((item) => {
            const isActive = path === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded 
                      transition-colors duration-150
                      ${isActive ? "bg-secondary font-medium" : "hover:bg-gray-50"}
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="w-full">{item.title}</span>
                    {item.isAlpha && <Badge variant="destructive">Alpha</Badge>}
                    {item.isNew && <Badge variant="success">Novo</Badge>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* ——— Logout Footer ——— */}
        <div className="pt-4 flex border-t mt-4">
          <button
            onClick={logout}
            className="flex items-center self-center justify-center w-[50%] gap-3 px-3 py-2 rounded hover:bg-secondary cursor-pointer transition-colors duration-150"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
