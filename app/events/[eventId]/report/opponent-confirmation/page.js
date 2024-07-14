"use client";

import { useParams, useRouter } from "next/navigation";
import OpponentConfirmation from "./OpponentConfirmation";
import { useReportContext } from "context/ReportContext";
import ProtectedRoute from "components/ProtectedRoute";
import PageWrapper from "components/PageWrapper";

const OpponentConfirmationPage = () => {
  const { reportState, setReportState } = useReportContext();
  const router = useRouter();
  const { eventId } = useParams();

  const handleYes = () => {
    setReportState((prevState) => ({
      ...prevState,
      selectedSet: reportState.filteredSets[0],
    }));
    router.push(`/events/${eventId}/report/best-of`);
  };

  const handleNo = () => {
    router.push(`/events/${eventId}/report/opponent-selection`);
  };

  return (
    <OpponentConfirmation
      filteredSets={reportState.filteredSets}
      onYes={handleYes}
      onNo={handleNo}
    />
  );
};

export default ProtectedRoute(OpponentConfirmationPage, [
  "selectedEntrant",
  "sets",
  "filteredSets",
]);
