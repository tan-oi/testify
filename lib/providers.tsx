  "use client";
  import { SessionProvider } from "next-auth/react";
  import { ThemeProvider } from "@/components/theme-provider";
  import { Toaster } from "sonner";
  // import { GlobalModal } from "@/components/use-dialog";
  import {
    isServer,
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";

  import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

  function makeQueryClient() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    });
  }

  let browserQueryClient: QueryClient | undefined = undefined;

  function getQueryClient() {
    if (isServer) {
      return makeQueryClient();
    } else {
      if (!browserQueryClient) browserQueryClient = makeQueryClient();
      return browserQueryClient;
    }
  }

  export function AppProviders({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* <GlobalModal /> */}
            <Toaster richColors />
          </ThemeProvider>
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </SessionProvider>
    );
  }
