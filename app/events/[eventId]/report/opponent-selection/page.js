"use client";

import { useParams, useRouter } from "next/navigation";
import OpponentSelection from "./OpponentSelection";
import { useReportContext } from "context/ReportContext";
import ProtectedRoute from "components/ProtectedRoute";

const OpponentSelectionPage = () => {
  const { reportState, setReportState } = useReportContext();
  const router = useRouter();
  const { eventId } = useParams();

  console.log({ reportState });

  const handleSetSelect = (set) => {
    setReportState((prevState) => ({ ...prevState, selectedSet: set }));
    router.push(`/events/${eventId}/report/best-of`);
  };

  return (
    <OpponentSelection sets={reportState.sets} onSelect={handleSetSelect} />
  );
};

export default ProtectedRoute(OpponentSelectionPage, [
  "selectedEntrant",
  "sets",
  "filteredSets",
]);
