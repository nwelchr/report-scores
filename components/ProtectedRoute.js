import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useReportContext } from "context/ReportContext";

const ProtectedRoute = (WrappedComponent, requiredState) => {
  return (props) => {
    const { state } = useReportContext();
    const router = useRouter();
    const { eventId } = useParams();

    useEffect(() => {
      const isStateValid = requiredState.every((key) => state[key]);
      if (!isStateValid) {
        router.push(`/events/${eventId}/report/select-entrant`);
      }
    }, [state, router, eventId]);

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
