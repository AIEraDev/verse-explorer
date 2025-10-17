"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * QueryProvider Component
 *
 * Provides React Query context to the entire application, enabling efficient
 * data fetching, caching, and state management across all components.
 *
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false, // Prevents excessive refetching during development
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools only render in development, zero production bundle impact */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
