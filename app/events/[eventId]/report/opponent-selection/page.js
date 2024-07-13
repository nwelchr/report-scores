import { useRouter } from "next/router";
import OpponentSelection from "./OpponentSelection";
import { useReportContext } from "context/ReportContext";
import ProtectedRoute from "components/ProtectedRoute";
import PageWrapper from "components/PageWrapper";

const OpponentSelectionPage = () => {
  const { state, updateState } = useReportContext();
  const router = useRouter();
  const { eventId } = router.query;

  const handleSetSelect = (set) => {
    updateState({ selectedSet: set });
    router.push(`/events/${eventId}/report/best-of`);
  };

  return (
    <PageWrapper>
      <OpponentSelection sets={state.filteredSets} onSelect={handleSetSelect} />
    </PageWrapper>
  );
};

export default ProtectedRoute(OpponentSelectionPage, ["filteredSets"]);
