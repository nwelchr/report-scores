import { useParams, useRouter } from "next/navigation";
import OpponentConfirmation from "./OpponentConfirmation";
import { useReportContext } from "context/ReportContext";
import ProtectedRoute from "components/ProtectedRoute";
import PageWrapper from "components/PageWrapper";

const OpponentConfirmationPage = () => {
  const { state, updateState } = useReportContext();
  const router = useRouter();
  const { eventId } = useParams();

  const handleYes = () => {
    router.push(`/events/${eventId}/report/best-of`);
  };

  const handleNo = () => {
    router.push(`/events/${eventId}/report/opponent-selection`);
  };

  return (
    <PageWrapper>
      <OpponentConfirmation onYes={handleYes} onNo={handleNo} />
    </PageWrapper>
  );
};

export default ProtectedRoute(OpponentConfirmationPage, ["selectedEntrant"]);
