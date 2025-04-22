"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { DeveloperProvider } from "../context/developers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const client = new QueryClient();
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={client}>
        <DeveloperProvider>{children}</DeveloperProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
