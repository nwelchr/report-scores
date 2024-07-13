"use client";

import { useParams, useRouter } from "next/navigation";
import OpponentSelection from "./OpponentSelection";
import { useReportContext } from "context/ReportContext";
import ProtectedRoute from "components/ProtectedRoute";
import PageWrapper from "components/PageWrapper";

const OpponentSelectionPage = () => {
  const { reportState, setReportState } = useReportContext();
  const router = useRouter();
  const { eventId } = useParams();

  const handleSetSelect = (set) => {
    setReportState((prevState) => ({ ...prevState, selectedSet: set }));
    router.push(`/events/${eventId}/report/best-of`);
  };

  return (
    <PageWrapper>
      <OpponentSelection sets={reportState.sets} onSelect={handleSetSelect} />
    </PageWrapper>
  );
};

export default ProtectedRoute(OpponentSelectionPage, ["filteredSets"]);
