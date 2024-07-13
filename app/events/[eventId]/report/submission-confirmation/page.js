import SubmissionConfirmation from "./SubmissionConfirmation";
import ProtectedRoute from "components/ProtectedRoute";
import PageWrapper from "components/PageWrapper";

const SubmissionConfirmationPage = () => {
  return <SubmissionConfirmation />;
};

export default ProtectedRoute(SubmissionConfirmationPage, [
  "selectedEntrant",
  "sets",
  "filteredSets",
  "selectedSet",
  "gameData",
]);
