import SubmissionConfirmation from "./SubmissionConfirmation";
import ProtectedRoute from "components/ProtectedRoute";
import PageWrapper from "components/PageWrapper";

const SubmissionConfirmationPage = () => {
  return (
    <PageWrapper>
      <SubmissionConfirmation />
    </PageWrapper>
  );
};

export default ProtectedRoute(SubmissionConfirmationPage, [
  "selectedEntrant",
  "selectedSet",
  "gameData",
]);
