import { useRouter } from "next/router";
import { useEffect } from "react";
import { useReportContext } from "app/context/ReportContext";

const ProtectedRoute = (WrappedComponent, requiredState) => {
  return (props) => {
    const { state } = useReportContext();
    const router = useRouter();

    useEffect(() => {
      const isStateValid = requiredState.every((key) => state[key]);
      if (!isStateValid) {
        router.push(`/events/${router.query.eventId}/report/select-entrant`);
      }
    }, [state, router]);

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
