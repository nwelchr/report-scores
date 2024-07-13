import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useReportContext } from "context/ReportContext";
import { useLoading } from "context/LoadingContext";

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
    const { reportState } = useReportContext();
    const { isLoading, setIsLoading } = useLoading();
    const router = useRouter();
    const { eventId } = useParams();

    useEffect(() => {
      console.log(router);
      if (!isStateValid(reportState, requiredState)) {
        router.push(`/events/${eventId}/report/select-entrant`);
      } else {
        setIsLoading(false);
      }
    }, [reportState, router, eventId]);

    if (!isStateValid(reportState, requiredState)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithProtection.displayName = `ProtectedRoute(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithProtection;
};

export default ProtectedRoute;
