import { useParams, useRouter } from "next/navigation";
import ScoreInput from "./ScoreInput";
import { useReportContext } from "context/ReportContext";
import ProtectedRoute from "components/ProtectedRoute";
import PageWrapper from "components/PageWrapper";

const ScoreInputPage = () => {
  const { reportState, setReportState } = useReportContext();
  const router = useRouter();
  const { eventId } = useParams();

  const handleSubmit = (localGameData) => {
    const winnerId =
      localGameData.filter(
        (game) => game.winnerId === reportState.selectedEntrant.id
      ).length >
      localGameData.filter(
        (game) => game.winnerId === reportState.selectedSet.opponent.id
      ).length
        ? reportState.selectedEntrant.id
        : reportState.selectedSet.opponent.id;
    const setId = reportState.selectedSet.id;
    reportSet({ eventId, setId, winnerId, gameData: localGameData });
    router.push(`/events/${eventId}/report/submission-confirmation`);
  };

  return (
    <PageWrapper>
      <ScoreInput onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default ProtectedRoute(ScoreInputPage, ["gameData"]);
