"use client";

import { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  MiddleSidebarArgs,
  MiddleSidebarContext,
} from "~/context/MiddleSidebar";

type Props = { children: React.ReactNode };

export function Providers({ children }: Props) {
  const [middleSidebarState, setMiddleSidebarState] =
    useState<MiddleSidebarArgs>(null);

  const context = { middleSidebarState, setMiddleSidebarState };

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
      <MiddleSidebarContext.Provider value={context}>
        {children}
      </MiddleSidebarContext.Provider>
    </NextThemesProvider>
  );
}
