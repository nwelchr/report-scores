"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReportProvider } from "app/context/ReportContext";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  console.log("hello");

  return (
    <QueryClientProvider client={queryClient}>
      <ReportProvider>{children}</ReportProvider>
    </QueryClientProvider>
  );
}
