import { useRouter } from "next/router";
import OpponentConfirmation from "./OpponentConfirmation";
import { useReportContext } from "app/context/ReportContext";
import ProtectedRoute from "app/components/ProtectedRoute";
import PageWrapper from "app/components/PageWrapper";

const OpponentConfirmationPage = () => {
  const { state, updateState } = useReportContext();
  const router = useRouter();
  const { eventId } = router.query;

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
