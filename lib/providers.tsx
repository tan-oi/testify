"use client"; // Required for Client Components

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { GlobalModal } from "@/components/use-dialog";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <GlobalModal />
        <Toaster richColors />
      </ThemeProvider>
    </SessionProvider>
  );
}
