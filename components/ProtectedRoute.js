"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useReportContext } from "context/ReportContext";
import Loader from "components/Loader";

const isStateValid = (reportState, requiredState) => {
  return requiredState.every((key) => {
    const value = reportState[key];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return Boolean(value);
  });
};

const ProtectedRoute = (WrappedComponent, requiredState) => {
  const ComponentWithProtection = (props) => {
    const { reportState, isLoading, setIsLoading } = useReportContext();
    const router = useRouter();
    const { eventId } = useParams();

    useEffect(() => {
      setIsLoading(true);
      if (!isStateValid(reportState, requiredState)) {
        router.push(`/events/${eventId}/report/select-entrant`);
      } else {
        setIsLoading(false);
      }
    }, [reportState, router, eventId, setIsLoading]);

    return isLoading ? <Loader /> : <WrappedComponent {...props} />;
  };

  ComponentWithProtection.displayName = `ProtectedRoute(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithProtection;
};

export default ProtectedRoute;
