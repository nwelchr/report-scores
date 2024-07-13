import SubmissionConfirmation from "./SubmissionConfirmation";
import ProtectedRoute from "app/components/ProtectedRoute";
import PageWrapper from "app/components/PageWrapper";

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
