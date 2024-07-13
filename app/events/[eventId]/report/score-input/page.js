import { useRouter } from "next/router";
import ScoreInput from "./ScoreInput";
import { useReportContext } from "app/context/ReportContext";
import ProtectedRoute from "app/components/ProtectedRoute";
import PageWrapper from "app/components/PageWrapper";

const ScoreInputPage = () => {
  const { state, updateState } = useReportContext();
  const router = useRouter();
  const { eventId } = router.query;

  const handleSubmit = (localGameData) => {
    const winnerId =
      localGameData.filter((game) => game.winnerId === state.selectedEntrant.id)
        .length >
      localGameData.filter(
        (game) => game.winnerId === state.selectedSet.opponent.id
      ).length
        ? state.selectedEntrant.id
        : state.selectedSet.opponent.id;
    const setId = state.selectedSet.id;
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
