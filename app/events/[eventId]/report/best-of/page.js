import { useRouter } from "next/router";
import BestOf from "./BestOf";
import { useReportContext } from "app/context/ReportContext";
import ProtectedRoute from "app/components/ProtectedRoute";
import PageWrapper from "app/components/PageWrapper";

const BestOfPage = () => {
  const { state, updateState } = useReportContext();
  const router = useRouter();
  const { eventId } = router.query;

  const handleSelect = (bestOf) => {
    updateState({ gameData: Array(bestOf).fill({ gameNum: 1 }) });
    router.push(`/events/${eventId}/report/score-input`);
  };

  return (
    <PageWrapper>
      <BestOf onSelect={handleSelect} />
    </PageWrapper>
  );
};

export default ProtectedRoute(BestOfPage, ["selectedSet"]);
