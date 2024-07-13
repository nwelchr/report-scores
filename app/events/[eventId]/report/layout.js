"use client";

import PageWrapper from "components/PageWrapper";
import Loader from "components/Loader";
import { useLoading } from "context/LoadingContext";

export default function ReportLayout({ children }) {
  const { isLoading } = useLoading();
  return <PageWrapper>{children}</PageWrapper>;
}
