import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useReportContext } from "context/ReportContext";

const ProtectedRoute = (WrappedComponent, requiredState) => {
  const ComponentWithProtection = (props) => {
    const { reportState } = useReportContext();
    const router = useRouter();
    const { eventId } = useParams();

    useEffect(() => {
      const isStateValid = requiredState.every((key) => reportState[key]);
      if (!isStateValid) {
        router.push(`/events/${eventId}/report/select-entrant`);
      }
    }, [reportState, router, eventId]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithProtection.displayName = `ProtectedRoute(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithProtection;
};

export default ProtectedRoute;
