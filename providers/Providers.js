"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReportProvider } from "context/ReportContext";
import { LoadingProvider } from "context/LoadingContext";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <ReportProvider>{children}</ReportProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
}
