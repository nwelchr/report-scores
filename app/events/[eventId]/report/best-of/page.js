"use client";

import { useParams, useRouter } from "next/navigation";
import BestOf from "./BestOf";
import { useReportContext } from "context/ReportContext";
import ProtectedRoute from "components/ProtectedRoute";
import PageWrapper from "components/PageWrapper";

const BestOfPage = () => {
  const { reportState, setReportState } = useReportContext();
  const router = useRouter();
  const { eventId } = useParams();

  const handleSelect = (bestOf) => {
    setReportState((prevState) => ({
      ...prevState,
      gameData: Array(bestOf).fill({ gameNum: 1 }),
    }));
    router.push(`/events/${eventId}/report/score-input`);
  };

  return (
    <PageWrapper>
      <BestOf onSelect={handleSelect} />
    </PageWrapper>
  );
};

export default ProtectedRoute(BestOfPage, ["selectedSet"]);
