"use client";

import PageWrapper from "components/PageWrapper";
import { useReportContext } from "context/ReportContext";

export default function ReportLayout({ children }) {
  const { isLoading } = useReportContext;
  return <PageWrapper isLoading={isLoading}>{children}</PageWrapper>;
}
